<script setup lang="ts">
import type { PageContent } from '~/types/squidex'
import { useSquidexContent, resolveSquidexField } from '~/composables/useSquidexContent'

const { content: pages, error, pending } = useSquidexContent<PageContent['data']>('pages', {
  $top: 10,
  $orderby: 'created desc'
})

const pageList = computed(() => {
  return pages.value.map(page => ({
    id: page.id,
    title: resolveSquidexField<string>(page.data.title, 'iv'),
    slug: resolveSquidexField<string>(page.data.slug, 'iv'),
    description: resolveSquidexField<string>(page.data.metaDescription, 'iv') || ''
  }))
})

useHead({
  title: 'Inicio - Sitio Web Institucional',
  meta: [
    { name: 'description', content: 'Bienvenido al sitio web institucional' }
  ]
})
</script>

<template>
  <div class="home-container">
    <header class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Sitio Web Institucional</h1>
        <p class="hero-subtitle">Contenido dinámico desde Squidex CMS</p>
      </div>
    </header>

    <main class="main-content">
      <div v-if="pending" class="loading">
        <div class="spinner"></div>
        <p>Cargando páginas...</p>
      </div>

      <div v-else-if="error" class="error">
        <h2>Error al cargar las páginas</h2>
        <p class="error-message">{{ error }}</p>
        <p class="info">Asegúrate de configurar las variables de entorno en el archivo .env</p>
      </div>

      <div v-else-if="pageList.length > 0" class="pages-section">
        <h2 class="section-title">Páginas Disponibles</h2>
        <div class="pages-grid">
          <NuxtLink
            v-for="page in pageList"
            :key="page.id"
            :to="`/${page.slug}`"
            class="page-card"
          >
            <h3 class="page-card-title">{{ page.title }}</h3>
            <p v-if="page.description" class="page-card-description">
              {{ page.description }}
            </p>
            <span class="page-card-link">Ver página →</span>
          </NuxtLink>
        </div>
      </div>

      <div v-else class="no-pages">
        <h2>No hay páginas disponibles</h2>
        <p>Configura tu Squidex CMS y crea páginas con el schema "pages".</p>
        <div class="setup-info">
          <h3>Pasos para configurar:</h3>
          <ol>
            <li>Copia el archivo <code>.env.example</code> a <code>.env</code></li>
            <li>Configura tus credenciales de Squidex</li>
            <li>Crea un schema llamado "pages" en Squidex</li>
            <li>Agrega contenido y reinicia el servidor</li>
          </ol>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>&copy; 2025 Sitio Web Institucional - Powered by Nuxt 4 & Squidex</p>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7fafc;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.main-content {
  flex: 1;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
}

.error h2 {
  color: #c53030;
  margin-bottom: 1rem;
}

.error-message {
  color: #742a2a;
  margin-bottom: 1rem;
  font-family: monospace;
  font-size: 0.875rem;
}

.info {
  color: #2d3748;
  font-size: 0.875rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1a202c;
}

.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.page-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.page-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.page-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.page-card-description {
  color: #718096;
  margin-bottom: 1rem;
  flex: 1;
  line-height: 1.6;
}

.page-card-link {
  color: #667eea;
  font-weight: 600;
  font-size: 0.875rem;
}

.no-pages {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.no-pages h2 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.no-pages > p {
  color: #718096;
  margin-bottom: 2rem;
}

.setup-info {
  text-align: left;
  max-width: 600px;
  margin: 2rem auto 0;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 0.5rem;
}

.setup-info h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.setup-info ol {
  color: #4a5568;
  padding-left: 1.5rem;
}

.setup-info li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.setup-info code {
  background: #edf2f7;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #2d3748;
}

.footer {
  background: white;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #e2e8f0;
  color: #718096;
}
</style>
