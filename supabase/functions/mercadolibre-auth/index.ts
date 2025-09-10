import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
        
        try {
          // Exchange code for access token
          const appId = Deno.env.get('MELI_APP_ID');
          const clientSecret = Deno.env.get('MELI_CLIENT_SECRET');
          const redirectUri = `${url.origin}/mercadolibre-auth`;
          
          if (!appId || !clientSecret) {
            throw new Error('Missing MercadoLibre credentials');
          }

          const tokenResponse = await fetch('https://api.mercadolibre.com/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: appId,
              client_secret: clientSecret,
              code: code,
              redirect_uri: redirectUri,
            }),
          });

          if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error('Token exchange failed:', errorText);
            throw new Error(`Token exchange failed: ${tokenResponse.status}`);
          }

          const tokenData = await tokenResponse.json();
          console.log('Token exchange successful:', { 
            user_id: tokenData.user_id,
            expires_in: tokenData.expires_in 
          });

          // Get user info from MercadoLibre
          const userResponse = await fetch(`https://api.mercadolibre.com/users/me?access_token=${tokenData.access_token}`);
          const userData = await userResponse.json();
          
          // Initialize Supabase client
          const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
          const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
          const supabase = createClient(supabaseUrl, supabaseKey);

          // Get user from auth token (if available)
          const authHeader = req.headers.get('Authorization');
          let userId = null;
          
          if (authHeader) {
            const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
            userId = user?.id;
          }

          // Store integration data
          if (userId) {
            const { error: upsertError } = await supabase
              .from('meli_integrations')
              .upsert({
                user_id: userId,
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                meli_user_id: tokenData.user_id.toString(),
                updated_at: new Date().toISOString(),
              });

            if (upsertError) {
              console.error('Error saving integration:', upsertError);
            } else {
              console.log('Integration saved successfully');
            }
          }
          
          // Redirect to dashboard with success
          const redirectUrl = `${url.origin}/dashboard?auth=success&meli_user=${userData.nickname}`;
          
          return new Response(null, {
            status: 302,
            headers: {
              ...corsHeaders,
              'Location': redirectUrl,
            },
          });
          
        } catch (error) {
          console.error('Error in OAuth callback:', error);
          const redirectUrl = `${url.origin}/dashboard?auth=error&message=${encodeURIComponent(error.message)}`;
          
          return new Response(null, {
            status: 302,
            headers: {
              ...corsHeaders,
              'Location': redirectUrl,
            },
          });
        }
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