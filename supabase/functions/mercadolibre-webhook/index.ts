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
    if (req.method === 'POST') {
      const body = await req.json();
      
      console.log('MercadoLibre Webhook received:', {
        timestamp: new Date().toISOString(),
        body: body,
        headers: Object.fromEntries(req.headers.entries())
      });
      
      // Process different types of notifications
      const { topic, resource, user_id, application_id } = body;
      
      switch (topic) {
        case 'orders':
          console.log('Order notification received for resource:', resource);
          // Handle order updates
          break;
          
        case 'items':
          console.log('Item notification received for resource:', resource);
          // Handle item updates
          break;
          
        case 'questions':
          console.log('Question notification received for resource:', resource);
          // Handle question updates
          break;
          
        default:
          console.log('Unknown topic:', topic);
      }
      
      // Always respond with 200 to acknowledge receipt
      return new Response(
        JSON.stringify({ status: 'received', timestamp: new Date().toISOString() }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Only POST method allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in mercadolibre-webhook function:', error);
    
    // Still return 200 to prevent MercadoLibre from retrying
    return new Response(
      JSON.stringify({ status: 'error', error: error.message }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});