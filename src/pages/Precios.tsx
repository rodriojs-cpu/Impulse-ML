import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Check, 
  Zap, 
  TrendingUp, 
  Users, 
  BarChart3,
  Star,
  Smartphone
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Precios = () => {
  const plans = [
    {
      name: "Básico",
      price: "1,290",
      period: "por mes",
      description: "Perfecto para emprendedores que inician",
      features: [
        "50 análisis por mes",
        "Análisis básico de competencia", 
        "Gráficos de visitas",
        "Exportar a Excel",
        "Soporte por email"
      ],
      buttonText: "Empezar Gratis",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "2,990", 
      period: "por mes",
      description: "La opción más popular para vendedores serios",
      features: [
        "500 análisis por mes",
        "Análisis avanzado de competencia",
        "Gráficos de visitas y ventas",
        "Comparador de anúncios A/B",
        "Generador de títulos con IA",
        "Excel detallado de competencia",
        "App móvil incluida",
        "Soporte prioritario"
      ],
      buttonText: "Empezar Ahora",
      buttonVariant: "hero" as const,
      popular: true
    },
    {
      name: "Ultra",
      price: "4,990",
      period: "por mes", 
      description: "Para equipos y vendedores de alto volumen",
      features: [
        "Análisis ilimitados",
        "Todo lo de Pro +",
        "Análisis de las 5 primeras páginas",
        "IA avanzada para optimización",
        "Alertas de competencia en tiempo real",
        "API para integraciones",
        "Múltiples usuarios",
        "Soporte 24/7"
      ],
      buttonText: "Contactar Ventas",
      buttonVariant: "accent" as const,
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Carlos Rodriguez",
      role: "Vendedor de Electrónicos",
      content: "Gracias a AvantPro UY logré incrementar mis ventas en un 340% en solo 3 meses. La herramienta es increíble.",
      rating: 5,
      sales: "+340%"
    },
    {
      name: "María González", 
      role: "Tienda de Moda",
      content: "El análisis de competencia me ayudó a posicionar mejor mis productos. Ahora aparezco en las primeras páginas.",
      rating: 5,
      sales: "+250%"
    },
    {
      name: "Diego Martínez",
      role: "Tech Store",
      content: "La IA para generar títulos es fantástica. Me ahorra horas de trabajo y los resultados son excelentes.",
      rating: 5,
      sales: "+180%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Planes que se adaptan a{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              tu negocio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige el plan perfecto para hacer crecer tus ventas en MercadoLibre Uruguay
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-elegant transition-smooth ${
                plan.popular ? 'ring-2 ring-primary shadow-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-hero text-white px-4 py-1">
                    <Crown className="h-3 w-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              ¿Por qué elegir AvantPro UY?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-lg inline-block mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Análisis Profundo</h3>
                <p className="text-muted-foreground">
                  Datos precisos de visitas, ventas y competencia en MercadoLibre Uruguay
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-accent/10 rounded-lg inline-block mb-4">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">IA Avanzada</h3>
                <p className="text-muted-foreground">
                  Generación automática de títulos optimizados y estrategias ganadoras
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-success/10 rounded-lg inline-block mb-4">
                  <Smartphone className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">App Móvil</h3>
                <p className="text-muted-foreground">
                  Analiza productos desde cualquier lugar con nuestra app móvil
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Lo que dicen nuestros clientes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-elegant transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-success border-success">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {testimonial.sales}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-hero text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para hacer crecer tu negocio?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Únete a más de 5,000 vendedores que ya están aumentando sus ventas 
              con AvantPro Uruguay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8">
                Empezar Prueba Gratuita
              </Button>
              <Button variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white hover:text-primary">
                Hablar con Ventas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Precios;