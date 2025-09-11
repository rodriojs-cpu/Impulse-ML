import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  Loader2,
  Eye,
  TrendingUp,
  Star,
  ShoppingCart,
  ExternalLink,
  AlertCircle
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  thumbnail: string;
  permalink: string;
  seller_id: string | null;
  seller_reputation: any;
  category_id: string;
  condition: string;
  shipping: any;
  installments: any;
  tags: string[];
  accepts_mercadopago: boolean;
}

interface SearchResults {
  query: string;
  total_results: number;
  results: Product[];
  limited_data?: boolean;
}

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('search-meli-products', {
        body: {
          query: query.trim(),
          limit: 20
        }
      });

      if (error) {
        throw error;
      }

      setResults(data);
      
      toast({
        title: "Búsqueda completada",
        description: `Se encontraron ${data.total_results} productos para "${query}"`,
      });

    } catch (error: any) {
      console.error('Error searching products:', error);
      toast({
        title: "Error en la búsqueda",
        description: "No se pudieron obtener los productos. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const currencySymbol = currency === 'UYU' ? '$' : currency === 'USD' ? 'US$' : currency;
    return `${currencySymbol} ${price.toLocaleString('es-UY')}`;
  };

  const getSellerReputation = (reputation: any) => {
    if (!reputation) return null;
    
    const level = reputation.level_id;
    const color = level === '5_green' ? 'text-green-600' : 
                 level === '4_light_green' ? 'text-green-500' :
                 level === '3_yellow' ? 'text-yellow-500' :
                 level === '2_orange' ? 'text-orange-500' : 'text-red-500';
    
    return (
      <div className={`flex items-center ${color}`}>
        <Star className="h-3 w-3 mr-1 fill-current" />
        <span className="text-xs font-medium">
          {reputation.power_seller_status === 'gold' ? 'MercadoLíder Gold' :
           reputation.power_seller_status === 'silver' ? 'MercadoLíder' :
           'Vendedor'}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Buscar Productos en MercadoLibre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar productos (ej: iPhone 15, Samsung Galaxy, MacBook...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading || !query.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Limited Data Warning */}
      {results?.limited_data && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
          <CardContent className="pt-6">
            <div className="flex items-center text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium">Datos limitados</p>
                <p className="text-sm">
                  Conecta tu cuenta de MercadoLibre para acceder a datos completos de vendedores y estadísticas avanzadas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Resultados de búsqueda</span>
              <Badge variant="outline">
                {results.total_results.toLocaleString('es-UY')} productos encontrados
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No se encontraron productos para tu búsqueda.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.results.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Product Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        </div>

                        {/* Product Title */}
                        <h3 className="font-medium text-sm line-clamp-2 text-foreground">
                          {product.title}
                        </h3>

                        {/* Price */}
                        <div className="text-xl font-bold text-primary">
                          {formatPrice(product.price, product.currency)}
                        </div>

                        {/* Seller Reputation */}
                        {getSellerReputation(product.seller_reputation)}

                        {/* Condition & Shipping */}
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            {product.condition === 'new' ? 'Nuevo' : 'Usado'}
                          </Badge>
                          {product.shipping?.free_shipping && (
                            <Badge variant="secondary" className="text-xs">
                              Envío gratis
                            </Badge>
                          )}
                          {product.accepts_mercadopago && (
                            <Badge variant="outline" className="text-xs">
                              MercadoPago
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <a 
                              href={product.permalink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Ver
                            </a>
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              toast({
                                title: "Producto agregado",
                                description: "El producto se agregó a tu lista de análisis.",
                              });
                            }}
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Analizar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductSearch;