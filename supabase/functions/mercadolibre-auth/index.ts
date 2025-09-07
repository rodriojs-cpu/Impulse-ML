import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    if (req.method === 'GET') {
      // Handle OAuth callback from MercadoLibre
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      
      if (code) {
        console.log('Received OAuth callback with code:', code);
        console.log('State:', state);
        
        // Here you would exchange the code for an access token
        // For now, we'll just log it and redirect
        
        // Redirect to dashboard with success
        const redirectUrl = `${url.origin}/dashboard?auth=success`;
        
        return new Response(null, {
          status: 302,
          headers: {
            ...corsHeaders,
            'Location': redirectUrl,
          },
        });
      }
    }

    if (req.method === 'POST') {
      // Handle webhook notifications from MercadoLibre
      const body = await req.json();
      
      console.log('Received MercadoLibre notification:', body);
      
      // Process the notification here
      // You can save to database, trigger actions, etc.
      
      return new Response(
        JSON.stringify({ status: 'received' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in mercadolibre-auth function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});