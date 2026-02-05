<script setup lang="ts">
import type { PageContent } from '~/types/squidex'
import { useSquidexContentBySlug, resolveSquidexField } from '~/composables/useSquidexContent'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { content, error, pending } = useSquidexContentBySlug<PageContent['data']>(
  'pages',
  slug,
  'iv'
)

const pageTitle = computed(() => {
  if (!content.value?.data) return ''
  return resolveSquidexField<string>(content.value.data.title, 'iv')
})

const pageComponents = computed(() => {
  if (!content.value?.data?.components) return []
  return resolveSquidexField(content.value.data.components, 'iv') || []
})

const metaTitle = computed(() => {
  if (!content.value?.data?.metaTitle) return pageTitle.value
  return resolveSquidexField<string>(content.value.data.metaTitle, 'iv')
})

const metaDescription = computed(() => {
  if (!content.value?.data?.metaDescription) return ''
  return resolveSquidexField<string>(content.value.data.metaDescription, 'iv')
})

useHead({
  title: metaTitle,
  meta: [
    { name: 'description', content: metaDescription }
  ]
})

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription
})
</script>

<template>
  <div class="page-container">
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Cargando contenido...</p>
    </div>

    <div v-else-if="error" class="error">
      <h1>Error</h1>
      <p>No se pudo cargar el contenido de la página.</p>
      <p class="error-details">{{ error }}</p>
      <NuxtLink to="/" class="back-link">← Volver al inicio</NuxtLink>
    </div>

    <div v-else-if="content">
      <header v-if="pageTitle" class="page-header">
        <h1 class="page-title">{{ pageTitle }}</h1>
      </header>

      <DynamicContent 
        v-if="pageComponents.length"
        :components="pageComponents"
        language="iv"
      />

      <div v-else class="no-content">
        <p>Esta página no tiene componentes configurados.</p>
      </div>
    </div>

    <div v-else class="not-found">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <NuxtLink to="/" class="back-link">← Volver al inicio</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f7fafc;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
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

.error,
.not-found {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.error h1,
.not-found h1 {
  font-size: 3rem;
  color: #e53e3e;
  margin-bottom: 1rem;
}

.error p {
  color: #718096;
  margin-bottom: 1rem;
}

.error-details {
  font-size: 0.875rem;
  color: #a0aec0;
  font-family: monospace;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background 0.3s;
}

.back-link:hover {
  background: #5a67d8;
}

.page-header {
  background: white;
  padding: 3rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  max-width: 1200px;
  margin: 0 auto;
}

.no-content {
  padding: 4rem 2rem;
  text-align: center;
  color: #718096;
}
</style>
