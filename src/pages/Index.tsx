import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Zap, 
  BarChart3, 
  Target,
  Star,
  ArrowRight,
  CheckCircle,
  Award,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import heroImage from "@/assets/hero-dashboard.jpg";

const Index = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Análisis de Competencia",
      description: "Descubre qué hacen los vendedores exitosos en las primeras páginas de MercadoLibre Uruguay"
    },
    {
      icon: Eye,
      title: "Datos de Visitas Reales",
      description: "Conoce exactamente cuántas visitas reciben los productos de tu competencia"
    },
    {
      icon: Target,
      title: "Optimización de Títulos",
      description: "IA avanzada que genera títulos optimizados para mejorar tu posicionamiento"
    },
    {
      icon: TrendingUp,
      title: "Seguimiento de Ventas",
      description: "Monitorea el rendimiento de productos y identifica oportunidades de mercado"
    },
    {
      icon: Users,
      title: "Comparador A/B",
      description: "Compara anuncios lado a lado para descubrir las mejores estrategias"
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Analiza productos desde cualquier lugar con nuestra aplicación móvil"
    }
  ];

  const stats = [
    { number: "5,000+", label: "Vendedores activos" },
    { number: "340%", label: "Aumento promedio de ventas" },
    { number: "50,000+", label: "Productos analizados" },
    { number: "24/7", label: "Soporte disponible" }
  ];

  const testimonials = [
    {
      name: "Carlos R.",
      role: "Vendedor de Electrónicos",
      content: "Mis ventas aumentaron 340% en 3 meses usando AvantPro UY",
      rating: 5
    },
    {
      name: "María G.",
      role: "Tienda de Moda", 
      content: "Ahora aparezco en la primera página gracias al análisis de competencia",
      rating: 5
    },
    {
      name: "Diego M.",
      role: "Tech Store",
      content: "La IA para títulos me ahorra horas y los resultados son increíbles",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Zap className="h-3 w-3 mr-1" />
                  La mejor herramienta de análisis para ML Uruguay
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  La mejor forma de{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    alavancar tus ventas
                  </span>{" "}
                  en MercadoLibre
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Obtén datos esenciales sobre los vendedores que conquistaron la primera página 
                  y aplícalos en tus anuncios para multiplicar tus ventas
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="px-8" asChild>
                  <Link to="/dashboard">
                    Empezar Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8" asChild>
                  <Link to="/precios">
                    Ver Planes
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Sin tarjeta de crédito
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Prueba de 7 días gratis
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={heroImage} 
                  alt="Dashboard de análisis AvantPro Uruguay"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-lg shadow-elegant">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Ventas</p>
                    <p className="text-lg font-bold text-success">+340%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white dark:bg-card p-4 rounded-lg shadow-elegant">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Visitas</p>
                    <p className="text-lg font-bold text-primary">12,450</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Todo lo que necesitas para{" "}
              <span className="text-primary">dominar MercadoLibre</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Herramientas profesionales de análisis que te dan ventaja competitiva
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-elegant transition-smooth">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vendedores que ya están{" "}
              <span className="text-success">aumentando sus ventas</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Historias reales de éxito con AvantPro Uruguay
            </p>
          </div>
          
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
                  
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-hero text-white overflow-hidden">
            <CardContent className="p-12">
              <Award className="h-12 w-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para multiplicar tus ventas?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Únete a más de 5,000 vendedores que ya están dominando 
                MercadoLibre Uruguay con AvantPro
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="px-8" asChild>
                  <Link to="/dashboard">
                    Empezar Ahora Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link to="/precios">
                    Ver Planes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
