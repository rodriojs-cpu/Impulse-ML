import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  Users,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  XCircle
} from "lucide-react";

const Dashboard = () => {
  const [meliIntegration, setMeliIntegration] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Check MercadoLibre integration status
  useEffect(() => {
    const checkMeliIntegration = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await (supabase as any)
          .from('meli_integrations')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (!error && data) {
          setMeliIntegration(data);
        }
      } catch (error) {
        console.error('Error checking MercadoLibre integration:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check for auth callback parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    if (authStatus === 'success') {
      // Refresh integration status
      setTimeout(() => {
        checkMeliIntegration();
      }, 1000);
    } else if (authStatus === 'error') {
      const message = urlParams.get('message');
      console.error('MercadoLibre auth error:', message);
    }

    checkMeliIntegration();
  }, [user]);

  const handleConnectMercadoLibre = () => {
    window.location.href = 
      "https://stffmybggmfgrkskiykl.functions.supabase.co/mercadolibre-auth?start=1";
  };

  const stats = [
    {
      title: "Productos Analizados",
      value: "2,345",
      change: "+12%",
      trend: "up",
      icon: BarChart3,
    },
    {
      title: "Visitas Promedio",
      value: "1,892",
      change: "+8%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Conversión",
      value: "4.2%",
      change: "-0.5%",
      trend: "down",
      icon: Target,
    },
    {
      title: "Competidores",
      value: "156",
      change: "+24",
      trend: "up",
      icon: Users,
    },
  ];

  const topProducts = [
    {
      title: "iPhone 15 Pro Max 256GB",
      visits: "12,450",
      sales: "89",
      conversion: "3.2%",
      category: "Electrónicos",
    },
    {
      title: "Samsung Galaxy S24 Ultra",
      visits: "9,832",
      sales: "67",
      conversion: "2.8%",
      category: "Electrónicos",
    },
    {
      title: "MacBook Air M3",
      visits: "8,921",
      sales: "45",
      conversion: "2.1%",
      category: "Computación",
    },
    {
      title: "PlayStation 5 Slim",
      visits: "7,654",
      sales: "89",
      conversion: "4.2%",
      category: "Gaming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard de Análisis
            </h1>
            <p className="text-muted-foreground">
              Descubre oportunidades en MercadoLibre Uruguay
            </p>
          </div>
          <div className="flex items-center gap-4">
            {meliIntegration ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  MercadoLibre Conectado
                </span>
              </div>
            ) : (
              <Button
                variant="hero"
                onClick={handleConnectMercadoLibre}
                disabled={loading}
              >
                Conectar MercadoLibre
              </Button>
            )}
          </div>
        </div>

        {/* Connection Status Alert */}
        {!meliIntegration && !loading && (
          <Alert className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Para acceder a datos reales de MercadoLibre, necesitas conectar tu cuenta.
            </AlertDescription>
          </Alert>
        )}

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar productos en MercadoLibre Uruguay..."
                  className="pl-10"
                />
              </div>
              <Button variant="hero" className="px-8">
                <Zap className="mr-2 h-4 w-4" />
                Analizar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-elegant transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-success mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                        )}
                        <span 
                          className={`text-sm font-medium ${
                            stat.trend === "up" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Productos Más Analizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {product.visits} visitas
                      </span>
                      <span className="flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {product.sales} ventas
                      </span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">
                      {product.conversion}
                    </p>
                    <p className="text-xs text-muted-foreground">conversión</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;