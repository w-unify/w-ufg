<script setup lang="ts">
import type { HomePageData } from '~/types/squidex'
import { resolveSquidexField } from '~/composables/useSquidexContent'

useScrollAnimations()
useCounterAnimation()

const { content, pending, error } = useSquidexContent<HomePageData>('home', { $top: 1 })
const { firstAssetUrl } = useSquidexAsset()

const home = computed(() => content.value?.[0]?.data ?? null)

// --- Slider / Hero ---
const slider = computed(() => {
  const rawField = home.value?.['home-slider']
  const items = resolveSquidexField<any[]>(rawField, 'es')
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null
  }
  
  return items[0]
})

// --- Título principal ---
const titleSection = computed(() => {
  const items = resolveSquidexField<any[]>(home.value?.['home-title-1'], 'es')
  return items?.[0] ?? null
})

// --- Tu Futuro (About + Stats) ---
const futuro = computed(() => resolveSquidexField<any>(home.value?.['home-futuro'], 'es'))

const stats = computed(() => {
  const f = futuro.value
  if (!f?.estadisticas) return undefined
  return f.estadisticas.map((e: any) => {
    const raw = e.cifra || '0'
    const match = raw.match(/^([+]?)(\d+)([kK]?)$/)
    return {
      target: match ? parseInt(match[2]) : parseInt(raw) || 0,
      step: match && parseInt(match[2]) > 100 ? 50 : 1,
      prefix: match?.[1] || undefined,
      suffix: match?.[3] || undefined,
      label: e.etiqueta || ''
    }
  })
})

// --- Educación / Alianza ---
const educacion = computed(() => resolveSquidexField<any>(home.value?.['home-educacion'], 'es'))

// --- Acreditaciones ---
const acreditaciones = computed(() => {
  const items = resolveSquidexField<any[]>(home.value?.['home-acreditaciones'], 'es')
  if (!items) return undefined
  return items.map((a: any) => ({
    image: firstAssetUrl(a.imagen),
    name: a.titulo || ''
  }))
})

useHead({
  title: 'UFG - Universidad Francisco Gavidia',
  meta: [
    { name: 'description', content: 'Universidad Francisco Gavidia - Educación Local, con Impacto Global. Potenciada por Arizona State University.' }
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
        <p class="text-dark/70 text-sm">{{ error }}</p>
      </div>
    </div>

    <!-- Contenido desde Squidex -->
    <template v-else-if="home">
      <HomeHeroHome
        v-if="slider"
        :title="slider.titulo"
        :subtitle="slider.subtitulo"
        :image-desktop="firstAssetUrl(slider.imagenDesktop)"
        :image-mobile="firstAssetUrl(slider.imagenMobile)"
        :cta-link="slider.enlace || '/oferta-academica'"
      />

      <HomeIntroSection
        v-if="titleSection"
        :title="titleSection.titulo"
        :subtitle="titleSection.subtitulo"
      />

      <!-- Nuestra Propuesta - Estático -->
      <HomeAccessCards />

      <HomeAboutSection
        v-if="futuro"
        :title="futuro.titulo"
        :description="futuro.descripcion"
        :image="firstAssetUrl(futuro.homeIzq)"
      />

      <HomeStatsCounter
        v-if="stats"
        :stats="stats"
      />

      <HomeAllianceSection
        v-if="educacion"
        :title="educacion.titulo"
        :description="educacion.parrafo"
        :logos-image="firstAssetUrl(educacion.imagen1)"
        :campus-image="firstAssetUrl(educacion.imagen3Grande)"
        :cta-text="educacion.botonTexto"
        :cta-link="educacion.botonEnlace"
      />

      <HomeAccreditationsSection
        v-if="acreditaciones"
        :items="acreditaciones"
      />
    </template>

    <!-- Sin contenido -->
    <div v-else class="flex items-center justify-center min-h-[60vh] px-6">
      <div class="text-center max-w-md">
        <h2 class="font-futura-bold text-2xl text-dark mb-4">Sin contenido</h2>
        <p class="text-dark/70 text-sm">No se encontró contenido en Squidex para el schema 'home'</p>
      </div>
    </div>
  </div>
</template>
