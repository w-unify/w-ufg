<script setup lang="ts">
interface HeroData {
  bannerFondo: string
  logo: string
  mision: string
  vision: string
}

interface HistoriaItem {
  fecha: string
  parrafo: string
}

interface TabItem {
  titulo: string
  contenido: string
}

interface Tab {
  id: string
  label: string
  items: TabItem[]
}

interface Acreditacion {
  imagen: string
  titulo: string
}

interface ReglamentoItem {
  titulo: string
  parrafo: string
  imagen?: string
}

interface ReglamentoData {
  titulo: string
  items: ReglamentoItem[]
}

interface InstitucionPageData {
  tituloPagina: string
  hero: HeroData
  valoresTitulo: string
  valores: string[]
  historiaTitulo: string
  historia: HistoriaItem[]
  organigramaTitulo: string
  organigramaImagen: string
  autoridades: Tab[]
  autoridadesBtnTexto: string
  autoridadesBtnUrl: string
  acreditacionesTitulo: string
  acreditaciones: Acreditacion[]
  reglamento: ReglamentoData | null
}

useScrollAnimations()

const { data, pending, error } = await useFetch<InstitucionPageData>('/api/squidex/pagina-institucion')

useHead({
  title: 'Institución - UFG',
  meta: [
    { name: 'description', content: 'Conoce la Universidad Francisco Gavidia: misión, visión, valores, historia y organización institucional.' },
    { name: 'keywords', content: 'UFG institución, misión UFG, visión UFG, historia UFG, acreditaciones UFG' }
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
          <h1 class="heading-1">{{ data?.tituloPagina ?? 'Institución' }}</h1>
        </div>
      </section>

      <!-- Sección 1+2: Hero (banner + logo + misión/visión + valores) -->
      <InstitucionHero
        v-if="data?.hero"
        :banner-fondo="data.hero.bannerFondo"
        :logo="data.hero.logo"
        :mision="data.hero.mision"
        :vision="data.hero.vision"
        :valores-titulo="data.valoresTitulo"
        :valores="data.valores"
      />

      <!-- Sección 3: Historia (timeline scroll horizontal) -->
      <InstitucionHistoria
        v-if="data?.historia?.length"
        :titulo="data.historiaTitulo"
        :items="data.historia"
      />

      <!-- Sección 4: Organigrama -->
      <InstitucionOrganigrama
        v-if="data?.organigramaImagen"
        :titulo="data.organigramaTitulo"
        :imagen="data.organigramaImagen"
      />

      <!-- Sección 5: Autoridades (tabs) -->
      <InstitucionAutoridades
        v-if="data?.autoridades?.length"
        :tabs="data.autoridades"
        :btn-texto="data.autoridadesBtnTexto"
        :btn-url="data.autoridadesBtnUrl"
      />

      <!-- Sección 6: Acreditaciones -->
      <InstitucionAcreditaciones
        v-if="data?.acreditaciones?.length"
        :titulo="data.acreditacionesTitulo"
        :items="data.acreditaciones"
      />

      <!-- Sección 7: Reglamento (acordeón bg-primary) -->
      <InstitucionReglamento
        v-if="data?.reglamento?.items?.length"
        :titulo="data.reglamento.titulo"
        :items="data.reglamento.items"
      />

    </template>
  </div>
</template>
