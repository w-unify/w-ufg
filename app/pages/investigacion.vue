<script setup lang="ts">
interface TabItem {
  titulo: string
  contenido: string
}

interface Tab {
  id: string
  label: string
  items: TabItem[]
}

interface Boton {
  texto: string
  enlace: string
  icono?: string
}

interface Unidad {
  parrafo: string
  botones: Boton[]
}

interface Publicacion {
  imagen: string
  titulo: string
  categoria: string
  botonNombre: string
  botonUrl: string
}

interface InvestigacionPageData {
  tituloPagina: string
  lineasParrafo: string
  lineasTabs: Tab[]
  unidadesTitulo: string
  unidades: Unidad[]
  publicacionesTitulo: string
  publicaciones: Publicacion[]
}

useScrollAnimations()

const { data, pending, error } = await useFetch<InvestigacionPageData>('/api/squidex/pagina-investigacion')

useHead({
  title: 'Investigación - UFG',
  meta: [
    { name: 'description', content: 'Dirección de Investigación UFG: líneas de investigación, unidades de apoyo y publicaciones científicas.' },
    { name: 'keywords', content: 'investigación UFG, líneas de investigación UFG, publicaciones UFG, DDI UFG' }
  ]
})
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center min-h-[60vh]">
      <p class="font-futura-bold text-primary text-xl animate-pulse">Cargando...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[60vh] px-6">
      <div class="text-center max-w-md">
        <h2 class="font-futura-bold text-2xl text-dark mb-4">Error al cargar contenido</h2>
        <p class="text-dark/70 text-sm">{{ error.message }}</p>
      </div>
    </div>

    <!-- Contenido -->
    <template v-else>

      <!-- Hero Title -->
      <section class="relative pt-[30px] xl:pt-[40px] 2xl:pt-[170px] pb-[35px] xl:pb-[40px] 2xl:pb-[50px]">
        <div class="container mx-auto max-w-[1400px] px-5">
          <h1 class="heading-1">{{ data?.tituloPagina ?? 'Dirección de Investigación UFG' }}</h1>
        </div>
      </section>

      <!-- Sección 1: Líneas de Investigación (parrafo + tabs) -->
      <InvestigacionLineasInvestigacion
        v-if="data?.lineasTabs?.length"
        :parrafo="data.lineasParrafo"
        :tabs="data.lineasTabs"
      />

      <!-- Sección 2: Unidades de Apoyo -->
      <InvestigacionUnidadesApoyo
        v-if="data?.unidades?.length"
        :titulo="data.unidadesTitulo"
        :items="data.unidades"
      />

      <!-- Sección 3: Publicaciones con buscador -->
      <InvestigacionPublicaciones
        v-if="data?.publicaciones?.length"
        :titulo="data.publicacionesTitulo"
        :items="data.publicaciones"
      />

    </template>
  </div>
</template>
