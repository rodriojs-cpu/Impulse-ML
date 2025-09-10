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
      // Start OAuth flow
      const start = url.searchParams.get('start');
      if (start) {
        const appId = Deno.env.get('MELI_APP_ID');
        if (!appId) {
          console.error('MELI_APP_ID is not set');
          return new Response(
            JSON.stringify({ error: 'Missing MELI_APP_ID secret' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const redirectUri = `${url.origin}/mercadolibre-auth`;
        const state = crypto.randomUUID();
        const authUrl =
          `https://auth.mercadolibre.com.uy/authorization?response_type=code&client_id=${encodeURIComponent(appId)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;

        return new Response(null, {
          status: 302,
          headers: {
            ...corsHeaders,
            Location: authUrl,
          },
        });
      }

      // Handle OAuth callback from MercadoLibre
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      
      if (code) {
        console.log('Received OAuth callback with code:', code);
        console.log('State:', state);
        
        // TODO: Exchange code for access token and persist
        
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