<script setup lang="ts">
interface HeroData {
  logoImg: string
  miniBannerImg: string
  bannerImg: string
}

interface IntroData {
  titulo: string
  parrafo: string
}

interface SliderItem {
  titulo: string
  texto: string
  imagen: string
}

interface SliderSection {
  titulo: string
  bannerImg: string
  items: SliderItem[]
}

interface VideoData {
  titulo: string
  url: string
}

interface Presidente {
  titulo: string
  imgCircular: string
  logo: string
  parrafo: string
}

interface ComunicadoData {
  img: string
  parrafo: string
  textoBtn: string
  textoUrl: string
}

interface AsuPageData {
  hero: HeroData
  intro: IntroData
  beneficios: SliderSection | null
  video: VideoData
  competencias: SliderSection | null
  galeria: string[]
  presidentes: Presidente[]
  comunicado: ComunicadoData
}

useScrollAnimations()

const { data, pending, error } = await useFetch<AsuPageData>('/api/squidex/pagina-asu')

if (error.value) {
  console.error('[ASU Page] Error fetching data:', error.value)
}
if (data.value) {
  console.log('[ASU Page] Data loaded:', data.value)
}

useHead({
  title: 'Powered by ASU - UFG',
  meta: [
    { name: 'description', content: 'Forma parte de la UFG Powered By ASU, una institución con más de 42 años de trayectoria en la formación de profesionales comprometidos con el desarrollo.' },
    { name: 'keywords', content: 'UFG ASU, powered by ASU, alianza UFG Arizona State University, beneficios ASU' }
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
      <!-- Sección 1: Hero -->
      <AsuHero
        :banner-img="data.hero.bannerImg"
        :logo-img="data.hero.logoImg"
        :mini-banner-img="data.hero.miniBannerImg"
      />

      <!-- Sección 2: Intro -->
      <AsuIntro
        :titulo="data.intro.titulo"
        :parrafo="data.intro.parrafo"
      />

      <!-- Sección 3: Beneficios Slider -->
      <AsuBeneficios
        v-if="data.beneficios"
        :titulo="data.beneficios.titulo"
        :banner-img="data.beneficios.bannerImg"
        :items="data.beneficios.items"
      />

      <!-- Sección 4: Video -->
      <AsuVideo
        :titulo="data.video.titulo"
        :url="data.video.url"
      />

      <!-- Sección 5: Competencias Slider -->
      <AsuCompetencias
        v-if="data.competencias"
        :titulo="data.competencias.titulo"
        :banner-img="data.competencias.bannerImg"
        :items="data.competencias.items"
      />

      <!-- Sección 6: Galería -->
      <AsuGaleria
        v-if="data.galeria?.length"
        :imagenes="data.galeria"
      />

      <!-- Sección 7: Presidentes -->
      <AsuPresidentes
        v-if="data.presidentes?.length"
        :presidentes="data.presidentes"
      />

      <!-- Sección 8: Comunicado -->
      <AsuComunicado
        :img="data.comunicado.img"
        :parrafo="data.comunicado.parrafo"
        :texto-btn="data.comunicado.textoBtn"
        :texto-url="data.comunicado.textoUrl"
      />
    </template>
  </div>
</template>
