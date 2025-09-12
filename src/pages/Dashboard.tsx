import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import UserProfile from "@/components/UserProfile";
import ProductSearch from "@/components/ProductSearch";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  BarChart3,
  Target,
  CheckCircle,
  XCircle,
  User,
  Users,
  Search,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const [meliIntegration, setMeliIntegration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
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
              Bienvenido de vuelta, {user?.user_metadata?.full_name || user?.email}
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
              Para acceder a datos completos de MercadoLibre, conecta tu cuenta. 
              Aún puedes realizar búsquedas básicas sin conectar.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Buscar Productos
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Mi Perfil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">

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

            {/* Getting Started Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-primary" />
                  Primeros Pasos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        meliIntegration ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Conectar MercadoLibre</h3>
                        <p className="text-sm text-muted-foreground">
                          {meliIntegration ? 'Conectado correctamente' : 'Conecta tu cuenta para datos completos'}
                        </p>
                      </div>
                    </div>
                    {!meliIntegration && (
                      <Button variant="outline" size="sm" onClick={handleConnectMercadoLibre}>
                        Conectar
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Search className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Buscar Productos</h3>
                        <p className="text-sm text-muted-foreground">Encuentra productos para analizar</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("search")}>
                      Buscar
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Completar Perfil</h3>
                        <p className="text-sm text-muted-foreground">Personaliza tu experiencia</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("profile")}>
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search">
            <ProductSearch />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;