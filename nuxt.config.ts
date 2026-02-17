// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Habilitar características de Nuxt 4
  future: {
    compatibilityVersion: 4
  },

  // Configuración SSR
  ssr: true,

  // Tailwind CSS v4 via Vite plugin
  vite: {
    plugins: [tailwindcss()]
  },

  // CSS global
  css: ['~/assets/css/main.css'],

  // Configuración de TypeScript estricto
  typescript: {
    strict: true,
    typeCheck: false
  },

  // Runtime config para variables de entorno
  runtimeConfig: {
    // Variables privadas del servidor (no expuestas al cliente)
    squidex: {
      appName: process.env.SQUIDEX_APP_NAME,
      clientId: process.env.SQUIDEX_CLIENT_ID,
      clientSecret: process.env.SQUIDEX_CLIENT_SECRET,
      url: process.env.SQUIDEX_URL || 'https://cloud.squidex.io'
    },
    // Variables públicas (expuestas al cliente)
    public: {
      squidexAppName: process.env.SQUIDEX_APP_NAME,
      squidexUrl: process.env.SQUIDEX_URL || 'https://cloud.squidex.io'
    }
  },

  // Configuración de app directory (Nuxt 4)
  dir: {
    app: 'app'
  }
})
