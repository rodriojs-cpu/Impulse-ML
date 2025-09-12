import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import {
  FileText,
  Shield,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign
} from "lucide-react";

const Legal = () => {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Documentos Legales
          </h1>
          <p className="text-muted-foreground">
            Información legal sobre nuestros servicios y políticas
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="terms">Términos y Condiciones</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
            <TabsTrigger value="subscription">Suscripciones</TabsTrigger>
            <TabsTrigger value="refund">Reembolsos</TabsTrigger>
          </TabsList>

          {/* Términos y Condiciones */}
          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Términos y Condiciones de Uso
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Última actualización: 11 de Enero 2025</Badge>
                  <Badge variant="secondary">Versión 1.0</Badge>
                </div>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">1. Aceptación de los Términos</h3>
                    <p className="text-muted-foreground mb-4">
                      Al acceder y utilizar ImpulseML ("el Servicio"), usted acepta cumplir y estar sujeto a estos Términos y Condiciones. 
                      Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">2. Descripción del Servicio</h3>
                    <p className="text-muted-foreground mb-4">
                      ImpulseML es una plataforma de análisis de productos para MercadoLibre que proporciona:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Análisis de competencia y mercado</li>
                      <li>Datos de visitas y rendimiento de productos</li>
                      <li>Optimización de títulos con IA</li>
                      <li>Seguimiento de ventas y conversiones</li>
                      <li>Comparación de anuncios</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">3. Registro de Cuenta</h3>
                    <p className="text-muted-foreground mb-4">
                      Para utilizar nuestro servicio, debe crear una cuenta proporcionando información precisa y completa. 
                      Es responsable de mantener la confidencialidad de su cuenta y contraseña.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">4. Uso Aceptable</h3>
                    <p className="text-muted-foreground mb-4">Usted se compromete a:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Utilizar el servicio solo para fines legales y comerciales legítimos</li>
                      <li>No interferir con el funcionamiento del servicio</li>
                      <li>No intentar acceder a datos de otros usuarios</li>
                      <li>Cumplir con los términos de MercadoLibre al utilizar su API</li>
                      <li>No realizar ingeniería inversa del software</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">5. Propiedad Intelectual</h3>
                    <p className="text-muted-foreground mb-4">
                      Todo el contenido, funcionalidades y características del servicio son propiedad de ImpulseML y están 
                      protegidos por leyes de derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">6. Limitación de Responsabilidad</h3>
                    <p className="text-muted-foreground mb-4">
                      ImpulseML no será responsable de daños indirectos, incidentales, especiales o consecuentes 
                      resultantes del uso o la imposibilidad de usar el servicio.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">7. Modificaciones</h3>
                    <p className="text-muted-foreground mb-4">
                      Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                      Los cambios entrarán en vigor inmediatamente después de su publicación.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">8. Contacto</h3>
                    <p className="text-muted-foreground">
                      Para preguntas sobre estos términos, contáctenos en: <strong>legal@impulseml.com</strong>
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Política de Privacidad */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Política de Privacidad y Protección de Datos
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Última actualización: 11 de Enero 2025</Badge>
                  <Badge variant="secondary">GDPR Compliant</Badge>
                </div>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">1. Información que Recopilamos</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Información Personal:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Nombre completo y dirección de email</li>
                          <li>Información de empresa (opcional)</li>
                          <li>Número de teléfono (opcional)</li>
                          <li>Datos de facturación y pago</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Datos de Uso:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Búsquedas realizadas en la plataforma</li>
                          <li>Productos analizados</li>
                          <li>Configuraciones de cuenta</li>
                          <li>Logs de actividad (fechas, IPs, navegador)</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">2. Cómo Utilizamos su Información</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Proporcionar y mejorar nuestros servicios de análisis</li>
                      <li>Procesar pagos y gestionar suscripciones</li>
                      <li>Enviar comunicaciones importantes sobre el servicio</li>
                      <li>Personalizar su experiencia en la plataforma</li>
                      <li>Realizar análisis agregados para mejorar el producto</li>
                      <li>Cumplir con obligaciones legales</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">3. Datos de MercadoLibre</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-muted-foreground mb-2">
                        <strong>Importante:</strong> Cuando conecta su cuenta de MercadoLibre:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Solo accedemos a datos públicos de productos</li>
                        <li>No almacenamos sus credenciales de MercadoLibre</li>
                        <li>Los tokens de acceso se almacenan de forma encriptada</li>
                        <li>Puede revocar el acceso en cualquier momento</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">4. Compartir Información</h3>
                    <p className="text-muted-foreground mb-4">
                      <strong>No vendemos ni alquilamos sus datos personales.</strong> Solo compartimos información en casos específicos:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Con proveedores de servicios necesarios (procesamiento de pagos, hosting)</li>
                      <li>Cuando sea requerido por ley o autoridades competentes</li>
                      <li>En caso de fusión, adquisición o venta de activos (con previo aviso)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">5. Seguridad de Datos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Medidas Técnicas
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Encriptación SSL/TLS</li>
                          <li>Autenticación de dos factores</li>
                          <li>Backups seguros</li>
                          <li>Monitoreo 24/7</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Medidas Organizativas
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Acceso limitado por roles</li>
                          <li>Auditorías regulares</li>
                          <li>Entrenamiento del personal</li>
                          <li>Políticas de retención</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">6. Sus Derechos</h3>
                    <p className="text-muted-foreground mb-4">Bajo el GDPR y leyes locales, usted tiene derecho a:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales</li>
                      <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                      <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
                      <li><strong>Portabilidad:</strong> Obtener sus datos en formato estructurado</li>
                      <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
                      <li><strong>Limitación:</strong> Restringir el procesamiento en ciertos casos</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">7. Cookies y Tecnologías Similares</h3>
                    <p className="text-muted-foreground mb-4">
                      Utilizamos cookies esenciales para el funcionamiento del servicio y cookies analíticas 
                      para mejorar la experiencia del usuario. Puede gestionar sus preferencias de cookies 
                      en la configuración de su navegador.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">8. Contacto para Temas de Privacidad</h3>
                <p className="text-muted-foreground">
                  Para ejercer sus derechos o realizar consultas sobre privacidad, contáctenos en: 
                  <strong> privacy@impulseml.com</strong>
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

          {/* Contrato de Suscripción */}
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Contrato de Suscripción
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Última actualización: 11 de Enero 2025</Badge>
                  <Badge variant="secondary">Planes Mensuales y Anuales</Badge>
                </div>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">1. Planes de Suscripción Disponibles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Plan Pro Mensual
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Precio: $29.99 USD/mes</li>
                          <li>Facturación mensual</li>
                          <li>Cancela en cualquier momento</li>
                          <li>Acceso completo a todas las funciones</li>
                          <li>Análisis ilimitados</li>
                          <li>Soporte prioritario</li>
                        </ul>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Plan Pro Anual
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Precio: $299.99 USD/año</li>
                          <li>Equivale a $24.99/mes (17% descuento)</li>
                          <li>Facturación anual</li>
                          <li>Cancela en cualquier momento</li>
                          <li>Acceso completo a todas las funciones</li>
                          <li>Análisis ilimitados</li>
                          <li>Soporte prioritario VIP</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">2. Prueba Gratuita</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ul className="text-muted-foreground space-y-2">
                        <li><strong>Duración:</strong> 7 días desde el registro</li>
                        <li><strong>Acceso:</strong> Funciones completas sin restricciones</li>
                        <li><strong>Sin tarjeta:</strong> No se requiere información de pago</li>
                        <li><strong>Cancelación:</strong> Se cancela automáticamente si no se suscribe</li>
                        <li><strong>Datos:</strong> Se conservan durante 30 días adicionales</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">3. Facturación y Pagos</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Métodos de Pago Aceptados:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Tarjetas de crédito (Visa, Mastercard, American Express)</li>
                          <li>Tarjetas de débito internacionales</li>
                          <li>PayPal</li>
                          <li>Transferencias bancarias (solo planes anuales)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Términos de Facturación:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>La facturación se realiza por adelantado</li>
                          <li>Los pagos se procesan automáticamente en la fecha de renovación</li>
                          <li>Las facturas se envían por email después de cada pago</li>
                          <li>Los precios están expresados en dólares estadounidenses (USD)</li>
                          <li>Los impuestos aplicables se añaden según la jurisdicción</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">4. Renovación y Cancelación</h3>
                    <div className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Renovación Automática
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Las suscripciones se renuevan automáticamente</li>
                          <li>Se envía un recordatorio 7 días antes de la renovación</li>
                          <li>Puede desactivar la renovación automática en cualquier momento</li>
                          <li>Los cambios de plan se aplican en el próximo ciclo de facturación</li>
                        </ul>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Cancelación
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Puede cancelar en cualquier momento desde su cuenta</li>
                          <li>La cancelación surte efecto al final del período pagado</li>
                          <li>No hay penalizaciones por cancelación anticipada</li>
                          <li>Los datos se conservan por 30 días después de la cancelación</li>
                          <li>Puede reactivar la suscripción mientras los datos estén disponibles</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">5. Cambios de Precio</h3>
                    <p className="text-muted-foreground mb-4">
                      Nos reservamos el derecho de modificar los precios de nuestros planes. En caso de cambios:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Se notificará con 30 días de anticipación por email</li>
                      <li>Los suscriptores actuales mantendrán el precio por 6 meses adicionales</li>
                      <li>Puede cancelar antes de que surta efecto el nuevo precio</li>
                      <li>Los planes anuales están protegidos durante todo el período contratado</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">6. Interrupción del Servicio</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Interrupción por Falta de Pago:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Si el pago falla, se intentará nuevamente después de 3 días</li>
                          <li>Se enviarán notificaciones de recordatorio</li>
                          <li>El acceso se suspende después de 7 días de retraso</li>
                          <li>La cuenta se desactiva después de 30 días sin pago</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Garantía de Tiempo de Actividad:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Garantizamos 99.9% de tiempo de actividad mensual</li>
                          <li>Mantenimiento programado se notifica con 48 horas de anticipación</li>
                          <li>Créditos de servicio por tiempo de inactividad no programado</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">7. Soporte y Contacto</h3>
                     <p className="text-muted-foreground">
                       Para consultas sobre facturación y suscripciones: <strong>billing@impulseml.com</strong><br />
                       Soporte técnico: <strong>support@impulseml.com</strong><br />
                       Horario de atención: 24/7 para suscriptores Pro
                     </p>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Política de Reembolsos */}
          <TabsContent value="refund">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Política de Reembolsos y Devoluciones
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Última actualización: 11 de Enero 2025</Badge>
                  <Badge variant="secondary">30 días de garantía</Badge>
                </div>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">1. Garantía de Satisfacción de 30 Días</h3>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <p className="text-muted-foreground mb-3">
                        <strong>Ofrecemos una garantía completa de satisfacción de 30 días</strong> para todos nuestros planes de suscripción.
                      </p>
                      <ul className="text-muted-foreground space-y-2">
                        <li><strong>Período:</strong> 30 días desde la fecha del primer pago</li>
                        <li><strong>Cobertura:</strong> 100% del monto pagado</li>
                        <li><strong>Proceso:</strong> Automático tras la solicitud</li>
                        <li><strong>Tiempo de procesamiento:</strong> 5-10 días hábiles</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">2. Casos Elegibles para Reembolso</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Reembolso Completo (30 días)
                        </h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Insatisfacción con las funcionalidades del servicio</li>
                          <li>Problemas técnicos que no pudieron ser resueltos</li>
                          <li>El servicio no cumple con las expectativas descritas</li>
                          <li>Dificultades para conectar con MercadoLibre</li>
                          <li>Problemas de rendimiento persistentes</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Reembolso Proporcional
                        </h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Cancelación de plan anual antes del primer año (después de 30 días)</li>
                          <li>Interrupción del servicio por más de 72 horas consecutivas</li>
                          <li>Cambios significativos en las funcionalidades que afecten su uso</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">3. Casos NO Elegibles para Reembolso</h3>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                      <ul className="text-muted-foreground space-y-2">
                        <li>Solicitudes después del período de 30 días (excepto casos especiales)</li>
                        <li>Violación de los términos de uso</li>
                        <li>Abuso del sistema o uso fraudulento</li>
                        <li>Problemas causados por el usuario (configuración incorrecta, etc.)</li>
                        <li>Cambios en las políticas de MercadoLibre que afecten la conectividad</li>
                        <li>Suscripciones canceladas que ya han sido reembolsadas previamente</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">4. Proceso de Solicitud de Reembolso</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-foreground mb-2">Paso 1: Contacto Inicial</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Envíe un email a: <strong>refunds@impulseml.com</strong></li>
                          <li>Incluya su email de cuenta y razón del reembolso</li>
                          <li>Adjunte capturas de pantalla si es relevante</li>
                        </ul>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-foreground mb-2">Paso 2: Evaluación</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Nuestro equipo revisará su solicitud en 24-48 horas</li>
                          <li>Podemos solicitar información adicional si es necesario</li>
                          <li>Intentaremos resolver problemas técnicos antes del reembolso</li>
                        </ul>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-foreground mb-2">Paso 3: Procesamiento</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Aprobación y procesamiento en 5-10 días hábiles</li>
                          <li>Reembolso al método de pago original</li>
                          <li>Confirmación por email con número de referencia</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">5. Reembolsos por Problemas Técnicos</h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <p className="text-muted-foreground mb-3">
                        <strong>Nuestro Compromiso:</strong> Si experimentas problemas técnicos que impiden el uso normal del servicio:
                      </p>
                      <ul className="text-muted-foreground space-y-2">
                        <li>Respuesta inicial en menos de 4 horas</li>
                        <li>Resolución objetivo en 24-48 horas</li>
                        <li>Crédito de servicio por tiempo de inactividad</li>
                        <li>Reembolso completo si no podemos resolver el problema en 7 días</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">6. Disputas y Resolución</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Proceso de Mediación:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Las disputas se intentarán resolver mediante mediación directa</li>
                          <li>Escalamiento a supervisor en casos complejos</li>
                          <li>Opción de arbitraje independiente si es necesario</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Chargebacks y Disputas de Tarjeta:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Contactar siempre a soporte antes de iniciar un chargeback</li>
                          <li>Los chargebacks pueden resultar en la suspensión de la cuenta</li>
                          <li>Preferimos resolver disputas directamente</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">7. Excepciones Especiales</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Circunstancias Extraordinarias:</h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          Consideramos reembolsos fuera de la política estándar en casos excepcionales:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>Problemas médicos documentados</li>
                          <li>Situaciones económicas extremas</li>
                          <li>Problemas relacionados con la conectividad de MercadoLibre</li>
                          <li>Errores de facturación de nuestra parte</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">8. Contacto para Reembolsos</h3>
                    <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
                      <p className="text-muted-foreground mb-2">
                        <strong>Email de reembolsos:</strong> refunds@impulseml.com<br />
                        <strong>Tiempo de respuesta:</strong> 24-48 horas<br />
                        <strong>Horario de atención:</strong> Lunes a Viernes, 9:00 - 18:00 UTC-3<br />
                        <strong>Soporte urgente:</strong> support@impulseml.com (disponible 24/7)
                      </p>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Legal;