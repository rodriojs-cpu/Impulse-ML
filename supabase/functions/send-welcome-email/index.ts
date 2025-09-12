import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WebhookPayload {
  type: string;
  table: string;
  record: any;
  schema: string;
  old_record: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: WebhookPayload = await req.json();
    
    // Only process INSERT events on auth.users table
    if (payload.type !== "INSERT" || payload.table !== "users") {
      return new Response("Not a user creation event", { status: 200 });
    }

    const user = payload.record;
    const userEmail = user.email;
    const userName = user.raw_user_meta_data?.full_name || user.email;

    console.log(`Sending welcome email to: ${userEmail}`);

    const emailResponse = await resend.emails.send({
      from: "ImpulseML <noreply@impulseml.com>",
      to: [userEmail],
      subject: "¡Bienvenido a ImpulseML! 🚀",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">¡Bienvenido a ImpulseML!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Tu herramienta de análisis para MercadoLibre</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #333; margin-bottom: 20px;">Hola ${userName},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              ¡Gracias por unirte a ImpulseML! Estamos emocionados de ayudarte a optimizar tu negocio en MercadoLibre.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">🎯 Primeros pasos:</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li>Conecta tu cuenta de MercadoLibre</li>
                <li>Busca y analiza productos</li>
                <li>Completa tu perfil</li>
                <li>Explora nuestras herramientas de análisis</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://stffmybggmfgrkskiykl.supabase.co/dashboard" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Ir al Dashboard
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              Si tienes alguna pregunta, no dudes en contactarnos en <strong>support@impulseml.com</strong>
            </p>
          </div>
          
          <div style="background: #f1f1f1; padding: 20px; text-align: center; color: #999; font-size: 12px;">
            © 2025 ImpulseML. Todos los derechos reservados.
          </div>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);