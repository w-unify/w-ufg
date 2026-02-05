// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Habilitar características de Nuxt 4
  future: {
    compatibilityVersion: 4
  },

  // Configuración SSR
  ssr: true,

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
      squidexAppName: process.env.SQUIDEX_APP_NAME
    }
  },

  // Configuración de app directory (Nuxt 4)
  dir: {
    app: 'app'
  }
})
