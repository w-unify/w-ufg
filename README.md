# Sitio Web Institucional

Proyecto **Nuxt 4** con **SSR (Server-Side Rendering)** integrado con **Squidex CMS** para gestión de contenido dinámico.

## 🚀 Características

- ✅ **Nuxt 4** con características modernas y estructura `app/`
- ✅ **SSR habilitado** para mejor SEO y rendimiento
- ✅ **TypeScript estricto** con tipado completo
- ✅ **Integración Squidex CMS** con autenticación OAuth2
- ✅ **Token caching** para optimizar requests al API
- ✅ **Componentes dinámicos** basados en contenido de Squidex
- ✅ **Composables reutilizables** para data fetching
- ✅ **Server utilities** para proteger credenciales

## 📋 Requisitos Previos

- Node.js 18+ o superior
- NPM, PNPM, Yarn o Bun
- Cuenta de Squidex (Cloud o Self-hosted)
- Aplicación configurada en Squidex con credenciales OAuth2

## 🛠️ Instalación

1. **Clonar o inicializar el repositorio**

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

4. **Editar el archivo `.env` con tus credenciales de Squidex:**

```env
SQUIDEX_APP_NAME=tu-app-name
SQUIDEX_CLIENT_ID=tu-client-id
SQUIDEX_CLIENT_SECRET=tu-client-secret
SQUIDEX_URL=https://cloud.squidex.io
```

### Cómo obtener las credenciales de Squidex:

1. Accede a tu cuenta de Squidex
2. Selecciona tu aplicación
3. Ve a **Settings** → **Clients**
4. Crea un nuevo cliente o usa uno existente
5. Copia el **Client ID** y **Client Secret**

## 🏗️ Estructura del Proyecto

```
sitio-web-institucional/
├── app/
│   ├── components/          # Componentes Vue
│   │   ├── DynamicContent.vue      # Renderizador de componentes dinámicos
│   │   ├── HeroSection.vue         # Componente de ejemplo
│   │   ├── TextBlock.vue           # Componente de ejemplo
│   │   ├── ImageBlock.vue          # Componente de ejemplo
│   │   ├── CardGrid.vue            # Componente de ejemplo
│   │   └── UnknownComponent.vue    # Fallback para componentes no encontrados
│   ├── composables/         # Composables de Vue
│   │   └── useSquidexContent.ts    # Composable para consumir Squidex
│   └── pages/               # Páginas de la aplicación
│       ├── index.vue               # Página de inicio
│       └── [slug].vue              # Página dinámica por slug
├── server/
│   ├── api/squidex/         # Endpoints API del servidor
│   │   ├── content.get.ts          # Obtener contenido general
│   │   ├── content-by-id.get.ts    # Obtener contenido por ID
│   │   └── content-by-slug.get.ts  # Obtener contenido por slug
│   └── utils/
│       └── squidex.ts              # Utilidades de servidor para Squidex (OAuth2)
├── types/
│   └── squidex.ts           # Tipos TypeScript para Squidex
├── nuxt.config.ts           # Configuración de Nuxt 4
├── .env.example             # Plantilla de variables de entorno
└── package.json
```

## 📚 Uso

### Servidor de Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

### Configuración de Schema en Squidex

Para que el proyecto funcione correctamente, necesitas crear un schema llamado **"pages"** en Squidex con los siguientes campos:

#### Schema: `pages`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | String | Título de la página |
| `slug` | String | URL slug (único) |
| `components` | Array | Array de componentes dinámicos |
| `metaTitle` | String (opcional) | Meta título para SEO |
| `metaDescription` | String (opcional) | Meta descripción para SEO |

#### Estructura de Componentes

El campo `components` debe ser un array de objetos con la siguiente estructura:

```json
[
  {
    "type": "HeroSection",
    "title": "Bienvenido",
    "subtitle": "Subtítulo del hero"
  },
  {
    "type": "TextBlock",
    "title": "Sobre Nosotros",
    "content": "<p>Contenido HTML...</p>"
  },
  {
    "type": "ImageBlock",
    "imageUrl": "https://...",
    "alt": "Descripción",
    "caption": "Pie de imagen"
  },
  {
    "type": "CardGrid",
    "title": "Nuestros Servicios",
    "cards": [
      {
        "title": "Servicio 1",
        "description": "Descripción del servicio",
        "image": "https://..."
      }
    ]
  }
]
```

### Composables Disponibles

#### `useSquidexContent(schema, params?)`

Obtiene una lista de contenidos de un schema:

```vue
<script setup>
const { content, total, error, pending, refresh } = useSquidexContent('pages', {
  $top: 10,
  $skip: 0,
  $orderby: 'created desc'
})
</script>
```

#### `useSquidexContentById(schema, id)`

Obtiene un contenido específico por ID:

```vue
<script setup>
const { content, error, pending, refresh } = useSquidexContentById('pages', 'id-del-contenido')
</script>
```

#### `useSquidexContentBySlug(schema, slug, language?)`

Obtiene un contenido por su slug:

```vue
<script setup>
const route = useRoute()
const slug = computed(() => route.params.slug)

const { content, error, pending, refresh } = useSquidexContentBySlug('pages', slug, 'iv')
</script>
```

#### `resolveSquidexField(field, language?)`

Resuelve campos multi-idioma de Squidex:

```vue
<script setup>
const title = resolveSquidexField(content.value.data.title, 'iv')
</script>
```

### Agregar Nuevos Componentes Dinámicos

1. **Crear el componente en `app/components/`:**

```vue
<!-- app/components/MiNuevoComponente.vue -->
<script setup lang="ts">
interface Props {
  titulo?: string
  descripcion?: string
}

defineProps<Props>()
</script>

<template>
  <div class="mi-componente">
    <h2>{{ titulo }}</h2>
    <p>{{ descripcion }}</p>
  </div>
</template>
```

2. **Registrarlo en `DynamicContent.vue`:**

```vue
<script setup lang="ts">
const componentMap: Record<string, any> = {
  HeroSection: resolveComponent('HeroSection'),
  TextBlock: resolveComponent('TextBlock'),
  ImageBlock: resolveComponent('ImageBlock'),
  CardGrid: resolveComponent('CardGrid'),
  MiNuevoComponente: resolveComponent('MiNuevoComponente') // Agregar aquí
}
</script>
```

3. **Usar en Squidex con `type: "MiNuevoComponente"`**

## 🏭 Producción

### Build para Producción

```bash
npm run build
```

### Preview de Producción

```bash
npm run preview
```

## 🔒 Seguridad

- Las credenciales de Squidex **NUNCA** se exponen al cliente
- La autenticación OAuth2 se maneja completamente en el servidor
- Los tokens se almacenan en caché en memoria del servidor
- Las credenciales se configuran mediante variables de entorno

## 🐛 Troubleshooting

### Error: "Squidex credentials not configured"

Verifica que el archivo `.env` existe y contiene las credenciales correctas.

### Error: "Failed to authenticate with Squidex"

Verifica que las credenciales sean correctas y que el cliente tenga permisos en Squidex.

### Error al cargar contenido

1. Verifica que el schema exista en Squidex
2. Verifica que haya contenido publicado
3. Revisa los logs del servidor para más detalles

## 📖 Recursos

- [Documentación de Nuxt 4](https://nuxt.com/docs)
- [Documentación de Squidex](https://docs.squidex.io/)
- [API de Squidex](https://cloud.squidex.io/api/docs)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📝 Licencia

Este proyecto es de código abierto.
