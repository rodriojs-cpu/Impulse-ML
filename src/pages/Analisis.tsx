import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Star,
  DollarSign,
  Eye,
  ShoppingCart,
  Calendar,
  Award,
  Zap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Analisis = () => {
  const analysisData = {
    title: "iPhone 15 Pro Max 256GB Titanio Natural",
    price: "$2,499",
    visits: "12,450",
    sales: "89",
    conversion: "3.2%",
    seller: "TechStore_UY",
    rating: 4.8,
    reviews: 234,
    category: "Electrónicos > Celulares",
    link: "https://articulo.mercadolibre.com.uy/MLU-123456789"
  };

  const competitors = [
    {
      title: "iPhone 15 Pro Max 256GB - Nuevo",
      price: "$2,599",
      seller: "iPhoneCenter",
      visits: "8,920",
      sales: "67",
      conversion: "2.8%",
      rating: 4.7,
      reviews: 189,
      position: 2
    },
    {
      title: "iPhone 15 Pro Max 256GB Original",
      price: "$2,450",
      seller: "MobileWorld_UY",
      visits: "6,789",
      sales: "45",
      conversion: "2.1%",
      rating: 4.6,
      reviews: 156,
      position: 3
    },
    {
      title: "iPhone 15 Pro Max 256GB Garantía",
      price: "$2,699",
      seller: "Apple_Premium",
      visits: "5,432",
      sales: "38",
      conversion: "1.9%",
      rating: 4.9,
      reviews: 298,
      position: 4
    }
  ];

  const insights = [
    {
      type: "success",
      title: "Oportunidad de Precio",
      description: "Tu precio está 4% por debajo del promedio de la competencia"
    },
    {
      type: "warning", 
      title: "Mejora las Fotos",
      description: "Los competidores tienen en promedio 2 fotos más que tu anuncio"
    },
    {
      type: "info",
      title: "Título Optimizado",
      description: "Incluye palabras clave como 'original' y 'garantía' para mejor posicionamiento"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Análisis de Competencia
          </h1>
          <p className="text-muted-foreground">
            Analiza productos y descubre estrategias ganadoras
          </p>
        </div>

        {/* Search and Analyze */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Pega aquí la URL del producto de MercadoLibre..."
                  className="pl-10"
                />
              </div>
              <Button variant="hero" className="px-8">
                <Zap className="mr-2 h-4 w-4" />
                Analizar Producto
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="competitors">Competencia</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Product Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Producto Analizado</span>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver en ML
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{analysisData.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Categoría:</strong> {analysisData.category}</p>
                      <p><strong>Vendedor:</strong> {analysisData.seller}</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                        <span>{analysisData.rating} ({analysisData.reviews} reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">{analysisData.price}</p>
                      <p className="text-sm text-muted-foreground">Precio</p>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <Eye className="h-6 w-6 text-success mx-auto mb-2" />
                      <p className="text-2xl font-bold text-success">{analysisData.visits}</p>
                      <p className="text-sm text-muted-foreground">Visitas</p>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-accent">{analysisData.sales}</p>
                      <p className="text-sm text-muted-foreground">Ventas</p>
                    </div>
                    <div className="text-center p-4 bg-warning/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-warning mx-auto mb-2" />
                      <p className="text-2xl font-bold text-warning">{analysisData.conversion}</p>
                      <p className="text-sm text-muted-foreground">Conversión</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Competencia Directa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitors.map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Badge variant="outline" className="mr-2">
                            #{competitor.position}
                          </Badge>
                          <h3 className="font-semibold text-foreground">
                            {competitor.title}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span><strong>Vendedor:</strong> {competitor.seller}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current" />
                            <span>{competitor.rating} ({competitor.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {competitor.visits} visitas
                          </span>
                          <span className="flex items-center">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            {competitor.sales} ventas
                          </span>
                          <span className="text-success font-medium">
                            {competitor.conversion} conv.
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          {competitor.price}
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <Card key={index} className="hover:shadow-elegant transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg mr-4 ${
                        insight.type === 'success' ? 'bg-success/10' :
                        insight.type === 'warning' ? 'bg-warning/10' :
                        'bg-primary/10'
                      }`}>
                        <Award className={`h-5 w-5 ${
                          insight.type === 'success' ? 'text-success' :
                          insight.type === 'warning' ? 'text-warning' :
                          'text-primary'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {insight.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Historial de Análisis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Sin historial disponible
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Comienza analizando productos para ver tu historial aquí
                  </p>
                  <Button variant="hero">
                    <Zap className="mr-2 h-4 w-4" />
                    Analizar Primer Producto
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analisis;