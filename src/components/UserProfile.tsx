import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Crown,
  Settings,
  Loader2
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  company: string | null;
  phone: string | null;
  subscription_plan: string;
  subscription_status: string;
  trial_ends_at: string | null;
  created_at: string;
  updated_at: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    company: "",
    phone: "",
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          company: data.company || "",
          phone: data.phone || "",
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          company: formData.company,
          phone: formData.phone,
        })
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido guardados exitosamente.",
      });

      fetchProfile(); // Refresh profile data
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getSubscriptionBadge = () => {
    if (!profile) return null;

    const plan = profile.subscription_plan;
    const status = profile.subscription_status;

    let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
    let icon = <User className="h-3 w-3 mr-1" />;

    if (status === 'active') {
      if (plan === 'pro') {
        variant = "default";
        icon = <Crown className="h-3 w-3 mr-1" />;
      } else if (plan === 'premium') {
        variant = "secondary";
        icon = <Crown className="h-3 w-3 mr-1" />;
      }
    }

    return (
      <Badge variant={variant}>
        {icon}
        {plan === 'free' ? 'Gratis' : plan === 'pro' ? 'Pro' : plan === 'premium' ? 'Premium' : plan}
        {status === 'trialing' && ' (Prueba)'}
      </Badge>
    );
  };

  const getTrialStatus = () => {
    if (!profile?.trial_ends_at) return null;

    const trialEnd = new Date(profile.trial_ends_at);
    const now = new Date();
    const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) return null;

    return (
      <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg p-3 text-sm">
        <strong>Prueba gratuita:</strong> Te quedan {daysLeft} días de prueba premium
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Mi Perfil
            </CardTitle>
            {getSubscriptionBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {getTrialStatus()}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    className="pl-10"
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  El email no se puede modificar
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="pl-10"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa (opcional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="pl-10"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (opcional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                    placeholder="+598 99 123 456"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Miembro desde {profile ? new Date(profile.created_at).toLocaleDateString('es-UY') : ''}
              </div>
              
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de la cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Productos analizados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Búsquedas realizadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {profile?.subscription_plan === 'free' ? '7' : '∞'}
              </div>
              <div className="text-sm text-muted-foreground">Días restantes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;