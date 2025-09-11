import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SearchRequest {
  query: string;
  limit?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    // Check if user has MercadoLibre integration
    const { data: integration } = await supabaseClient
      .from('meli_integrations')
      .select('access_token')
      .eq('user_id', user.id)
      .single();

    const { query, limit = 20 }: SearchRequest = await req.json();

    let searchResults;

    if (integration?.access_token) {
      // Use MercadoLibre API with user's token for authenticated requests
      const meliResponse = await fetch(
        `https://api.mercadolibre.com/sites/MLU/search?q=${encodeURIComponent(query)}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${integration.access_token}`,
          },
        }
      );

      if (!meliResponse.ok) {
        throw new Error('Error al buscar productos en MercadoLibre');
      }

      const meliData = await meliResponse.json();
      
      // Transform and enrich the data
      searchResults = {
        query,
        total_results: meliData.paging?.total || 0,
        results: meliData.results?.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          currency: item.currency_id,
          thumbnail: item.thumbnail,
          permalink: item.permalink,
          seller_id: item.seller?.id,
          seller_reputation: item.seller?.seller_reputation,
          category_id: item.category_id,
          condition: item.condition,
          shipping: item.shipping,
          installments: item.installments,
          tags: item.tags || [],
          accepts_mercadopago: item.accepts_mercadopago,
        })) || [],
      };

      // Store search results in database for analysis
      const supabaseService = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      // Insert found products for future analysis
      for (const product of searchResults.results.slice(0, 10)) { // Limit to first 10 products
        await supabaseService.from("products").upsert({
          user_id: user.id,
          meli_id: product.id,
          title: product.title,
          price: product.price,
          currency: product.currency,
          category: product.category_id,
          seller_reputation: product.seller_reputation,
          last_analyzed: new Date().toISOString(),
        }, {
          onConflict: 'meli_id,user_id',
          ignoreDuplicates: false
        });
      }

    } else {
      // Use public MercadoLibre API (limited data)
      const meliResponse = await fetch(
        `https://api.mercadolibre.com/sites/MLU/search?q=${encodeURIComponent(query)}&limit=${limit}`
      );

      if (!meliResponse.ok) {
        throw new Error('Error al buscar productos en MercadoLibre');
      }

      const meliData = await meliResponse.json();
      
      searchResults = {
        query,
        total_results: meliData.paging?.total || 0,
        results: meliData.results?.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          currency: item.currency_id,
          thumbnail: item.thumbnail,
          permalink: item.permalink,
          category_id: item.category_id,
          condition: item.condition,
          // Limited data available without authentication
          seller_id: null,
          seller_reputation: null,
          shipping: item.shipping,
          installments: item.installments,
          tags: item.tags || [],
          accepts_mercadopago: item.accepts_mercadopago,
        })) || [],
        limited_data: !integration?.access_token,
      };
    }

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in search-meli-products function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        query: req.url 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);