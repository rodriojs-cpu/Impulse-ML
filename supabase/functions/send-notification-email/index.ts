import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  name: string;
  type: 'welcome' | 'password_reset' | 'subscription_confirm' | 'subscription_cancel';
  data?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, type, data }: EmailRequest = await req.json();

    let subject = "";
    let html = "";

    switch (type) {
      case 'welcome':
        subject = "¡Bienvenido a ImpulseML! Tu cuenta ha sido creada exitosamente";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
            <div style="background: white; padding: 30px; border-radius: 8px; margin: 20px 0;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 24px; font-weight: bold;">I</span>
                </div>
                <h1 style="color: #333; margin: 0; font-size: 28px;">¡Bienvenido a ImpulseML!</h1>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">Hola <strong>${name}</strong>,</p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                ¡Tu cuenta en ImpulseML ha sido creada exitosamente! Ahora tienes acceso a las herramientas más avanzadas 
                para analizar y optimizar tus ventas en MercadoLibre Uruguay.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">¿Qué puedes hacer ahora?</h3>
                <ul style="color: #555; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><strong>Conectar tu cuenta de MercadoLibre</strong> para acceder a datos reales</li>
                  <li><strong>Analizar productos de la competencia</strong> y descubrir oportunidades</li>
                  <li><strong>Optimizar tus títulos</strong> con IA avanzada</li>
                  <li><strong>Monitorear el rendimiento</strong> de tus productos</li>
                </ul>
              </div>
              
              <div style="background: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 25px 0;">
                <p style="margin: 0; color: #333; font-size: 14px;">
                  <strong>🎉 Prueba gratuita de 7 días:</strong> Tu prueba gratuita ya está activa. 
                  Explora todas las funcionalidades premium sin restricciones.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://impulseml.com/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                  Acceder al Dashboard
                </a>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                <p style="color: #666; font-size: 14px; line-height: 1.6;">
                  Si tienes alguna pregunta, nuestro equipo de soporte está disponible 24/7 para ayudarte.
                  Simplemente responde a este email.
                </p>
                
                <p style="color: #666; font-size: 14px; margin: 20px 0 0 0;">
                  ¡Gracias por elegir ImpulseML!<br>
                  <strong>El equipo de ImpulseML</strong>
                </p>
              </div>
            </div>
          </div>
        `;
        break;

      case 'password_reset':
        subject = "Solicitud de cambio de contraseña - ImpulseML";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; padding: 30px; border-radius: 8px; border: 1px solid #dee2e6;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 24px; font-weight: bold;">I</span>
                </div>
                <h1 style="color: #333; margin: 0; font-size: 24px;">Solicitud de cambio de contraseña</h1>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">Hola <strong>${name}</strong>,</p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en ImpulseML.
              </p>
              
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 25px 0;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>⚠️ Importante:</strong> Si no solicitaste este cambio, puedes ignorar este email de forma segura. 
                  Tu contraseña no será modificada.
                </p>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Para proceder con el cambio de contraseña, sigue el enlace que recibirás por separado desde el sistema 
                de autenticación de Supabase.
              </p>
              
              <div style="background: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 25px 0;">
                <p style="margin: 0; color: #333; font-size: 14px;">
                  <strong>💡 Consejo de seguridad:</strong> Te recomendamos usar una contraseña segura con al menos 
                  8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos especiales.
                </p>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                <p style="color: #666; font-size: 14px; line-height: 1.6;">
                  Si tienes problemas o necesitas ayuda, nuestro equipo de soporte está disponible las 24 horas.
                </p>
                
                <p style="color: #666; font-size: 14px; margin: 20px 0 0 0;">
                  Saludos,<br>
                  <strong>El equipo de ImpulseML</strong>
                </p>
              </div>
            </div>
          </div>
        `;
        break;

      case 'subscription_confirm':
        const plan = data?.plan || 'Pro';
        const amount = data?.amount || '$29.99';
        subject = `¡Suscripción ${plan} confirmada! - ImpulseML`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%); padding: 20px; border-radius: 10px;">
            <div style="background: white; padding: 30px; border-radius: 8px; margin: 20px 0;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%); border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 24px;">✓</span>
                </div>
                <h1 style="color: #333; margin: 0; font-size: 28px;">¡Suscripción Confirmada!</h1>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">Hola <strong>${name}</strong>,</p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                ¡Excelente! Tu suscripción al plan <strong>${plan}</strong> ha sido confirmada exitosamente.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #dee2e6;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Detalles de tu suscripción:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Plan:</td>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">${plan}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Precio:</td>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">${amount} / mes</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Estado:</td>
                    <td style="padding: 8px 0; color: #00b894; font-weight: bold; font-size: 14px;">Activa</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 25px 0;">
                <p style="margin: 0; color: #333; font-size: 14px;">
                  <strong>🚀 ¡Ya tienes acceso completo!</strong> Todas las funciones premium están disponibles 
                  en tu dashboard. Tu próximo cobro será procesado automáticamente el próximo mes.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://impulseml.com/dashboard" style="background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                  Ir al Dashboard
                </a>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                <p style="color: #666; font-size: 14px; line-height: 1.6;">
                  Puedes gestionar tu suscripción, actualizar tu método de pago o cancelar en cualquier momento 
                  desde la sección de facturación en tu cuenta.
                </p>
                
                <p style="color: #666; font-size: 14px; margin: 20px 0 0 0;">
                  ¡Gracias por tu confianza!<br>
                  <strong>El equipo de ImpulseML</strong>
                </p>
              </div>
            </div>
          </div>
        `;
        break;

      case 'subscription_cancel':
        subject = "Cancelación de suscripción confirmada - ImpulseML";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; padding: 30px; border-radius: 8px; border: 1px solid #dee2e6;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background: #6c757d; border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 24px; font-weight: bold;">I</span>
                </div>
                <h1 style="color: #333; margin: 0; font-size: 24px;">Suscripción Cancelada</h1>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">Hola <strong>${name}</strong>,</p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Hemos procesado tu solicitud de cancelación de suscripción en ImpulseML.
              </p>
              
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 25px 0;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>📅 Importante:</strong> Tu acceso premium continuará activo hasta el final del período de facturación actual. 
                  No se procesarán más cobros automáticos.
                </p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #dee2e6;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">¿Qué sucede ahora?</h3>
                <ul style="color: #555; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Mantienes acceso completo hasta el final del período actual</li>
                  <li>No se realizarán más cobros automáticos</li>
                  <li>Puedes reactivar tu suscripción en cualquier momento</li>
                  <li>Tus datos y análisis se conservan de forma segura</li>
                </ul>
              </div>
              
              <div style="background: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 25px 0;">
                <p style="margin: 0; color: #333; font-size: 14px;">
                  <strong>💙 Te extrañaremos:</strong> Siempre puedes volver cuando quieras. 
                  Tu cuenta permanecerá activa y podrás reactivar tu suscripción con un solo clic.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://impulseml.com/precios" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                  Reactivar Suscripción
                </a>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                <p style="color: #666; font-size: 14px; line-height: 1.6;">
                  Si cancelaste por error o tienes alguna pregunta, no dudes en contactarnos. 
                  Estamos aquí para ayudarte.
                </p>
                
                <p style="color: #666; font-size: 14px; margin: 20px 0 0 0;">
                  Gracias por haber sido parte de ImpulseML,<br>
                  <strong>El equipo de ImpulseML</strong>
                </p>
              </div>
            </div>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "ImpulseML <noreply@impulseml.com>",
      to: [email],
      subject: subject,
      html: html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
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