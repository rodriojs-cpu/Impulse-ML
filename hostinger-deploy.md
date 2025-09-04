# Guía de Despliegue en Hostinger

## 1. Preparación del Proyecto

### Build de Producción
```bash
npm run build
```

### Archivos Generados
El build creará una carpeta `dist/` con todos los archivos estáticos.

## 2. Configuración de Hostinger

### Subir Archivos
1. Accede al **Panel de Control de Hostinger**
2. Ve a **Administrador de Archivos**
3. Navega a la carpeta `public_html` (o tu dominio)
4. Sube TODOS los archivos de la carpeta `dist/` (no la carpeta, sino su contenido)

### Estructura Final en Hostinger
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── hero-dashboard-[hash].jpg
└── robots.txt
```

## 3. Configuración de Rutas (SPA)

### Crear .htaccess
Crea un archivo `.htaccess` en `public_html/` con:

```apache
RewriteEngine On
RewriteBase /

# Handle Angular and Vue.js routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache Headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 4. Variables de Entorno para Supabase

### En el Código (vite.config.ts)
Las variables deben estar definidas como:
```typescript
// En tu código React
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

### Archivo .env para Desarrollo Local
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### En Hostinger (Producción)
Como Hostinger no maneja variables de entorno automáticamente, tienes 2 opciones:

**Opción 1: Hardcodear en Build**
```typescript
// src/lib/supabase.ts
const supabaseUrl = 'https://tu-proyecto.supabase.co'
const supabaseKey = 'tu_clave_publica_aqui'
```

**Opción 2: Archivo de Configuración**
```typescript
// src/config/environment.ts
export const config = {
  supabase: {
    url: 'https://tu-proyecto.supabase.co',
    key: 'tu_clave_publica_aqui'
  }
}
```

## 5. Configuración de Dominio

### Si usas un Subdominio
```
Subdominios → Crear subdomain → avantpro
Apuntar a: public_html/avantpro/
```

### Si usas Dominio Principal
Los archivos van directamente en `public_html/`

## 6. Configuración SSL

1. **Panel de Hostinger** → **SSL**
2. Activar **SSL Gratuito** 
3. Forzar HTTPS en `.htaccess`:

```apache
# Forzar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 7. Configuración de Supabase para Producción

### En tu Panel de Supabase:
1. **Settings** → **API**
2. Copia la **URL** y **anon public key**
3. **Authentication** → **URL Configuration**
4. Agregar tu dominio en **Site URL**: `https://tudominio.com`
5. **Redirect URLs**: `https://tudominio.com/**`

## 8. Base de Datos y Políticas RLS

### Tablas Necesarias
```sql
-- Usuarios
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'basic',
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Productos Analizados
CREATE TABLE analyzed_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ml_id TEXT NOT NULL,
  title TEXT,
  price NUMERIC,
  sales_count INTEGER,
  visits_count INTEGER,
  analyzed_at TIMESTAMP DEFAULT NOW()
);

-- Análisis de Competencia
CREATE TABLE competitor_analysis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  search_term TEXT,
  results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Políticas RLS
```sql
-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyzed_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_analysis ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para analyzed_products
CREATE POLICY "Users can view own products" ON analyzed_products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products" ON analyzed_products
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 9. Edge Functions (Opcional)

Para integración con MercadoLibre API, puedes usar Supabase Edge Functions:

```typescript
// supabase/functions/mercadolibre-api/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { url, method } = req
  
  // Proxy a MercadoLibre API
  const response = await fetch(`https://api.mercadolibre.com${url}`, {
    method,
    headers: {
      'Authorization': `Bearer ${Deno.env.get('ML_ACCESS_TOKEN')}`
    }
  })
  
  return new Response(await response.text(), {
    headers: { "Content-Type": "application/json" }
  })
})
```

## 10. Comandos de Despliegue

```bash
# 1. Build del proyecto
npm run build

# 2. Comprimir archivos (opcional)
zip -r dist.zip dist/*

# 3. Subir a Hostinger vía FTP o File Manager

# 4. Extraer en public_html/
# (Si subiste zip, extraer contenido de dist/ en public_html/)
```

## 11. Verificación Post-Despliegue

1. ✅ **Rutas funcionan**: `tudominio.com/dashboard`
2. ✅ **SSL activo**: https://tudominio.com
3. ✅ **Supabase conecta**: Check en Network tab
4. ✅ **Assets cargan**: CSS, JS, imágenes
5. ✅ **SEO**: Meta tags visibles en código fuente

## Problemas Comunes

### Error 404 en rutas
- Verificar `.htaccess` existe y tiene las reglas correctas

### Supabase no conecta
- Verificar URL y keys en configuración
- Verificar CORS en Supabase dashboard

### Assets no cargan
- Verificar paths relativos en build
- Verificar permisos de archivos (755 para carpetas, 644 para archivos)