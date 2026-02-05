# 🚀 Inicio Rápido

## Pasos para comenzar:

### 1. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y agrega tus credenciales de Squidex:

```env
SQUIDEX_APP_NAME=tu-app-name
SQUIDEX_CLIENT_ID=tu-client-id
SQUIDEX_CLIENT_SECRET=tu-client-secret
SQUIDEX_URL=https://cloud.squidex.io
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
```

El sitio estará disponible en: http://localhost:3000

### 3. Crear schema "pages" en Squidex

En tu panel de Squidex, crea un schema llamado **"pages"** con estos campos:

- **title** (String) - Título de la página
- **slug** (String) - URL slug (debe ser único)
- **components** (Array) - Array de componentes dinámicos
- **metaTitle** (String, opcional) - Meta título SEO
- **metaDescription** (String, opcional) - Meta descripción SEO

### 4. Crear contenido de prueba

Ejemplo de estructura para el campo `components`:

```json
[
  {
    "type": "HeroSection",
    "title": "Bienvenido a mi sitio",
    "subtitle": "Construido con Nuxt 4 y Squidex"
  },
  {
    "type": "TextBlock",
    "title": "Sobre nosotros",
    "content": "<p>Este es un ejemplo de contenido dinámico.</p>"
  }
]
```

### 5. Componentes disponibles

- **HeroSection** - Banner hero con título y subtítulo
- **TextBlock** - Bloque de texto con título y contenido HTML
- **ImageBlock** - Imagen con caption
- **CardGrid** - Grilla de tarjetas

### 6. Acceder al contenido

- Página de inicio: http://localhost:3000
- Páginas dinámicas: http://localhost:3000/[tu-slug]

## Documentación completa

Lee el archivo `README.md` para documentación detallada.
