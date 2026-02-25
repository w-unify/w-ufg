<script setup lang="ts">
interface BeneficioItem {
  titulo: string
  contenido: string
}

interface Tab {
  id: string
  label: string
  items: BeneficioItem[]
}

interface VideoItem {
  titulo: string
  videoUrl: string
  nombrePersona: string
  profesionPersona: string
}

interface Boton {
  texto: string
  enlace: string
  icono?: string
}

interface Contacto {
  parrafo: string
  imagen: string
  nombre: string
  cargo: string
  botones: Boton[]
}

interface JoinWorkData {
  imagenIzq: string
  parrafo: string
}

interface ConexionUPageData {
  tituloPagina: string
  beneficiosTabs: Tab[]
  videoSlider: VideoItem[]
  bannerFondo: string
  contactos: Contacto[]
  joinWork: JoinWorkData
}

useScrollAnimations()

const { data, pending, error } = await useFetch<ConexionUPageData>('/api/squidex/pagina-conexion-u')

useHead({
  title: 'Conexión U - UFG',
  meta: [
    { name: 'description', content: 'Conexión U UFG: beneficios estudiantiles, asesorías, becas y sistema de pasantías JoinWork.' },
    { name: 'keywords', content: 'Conexión U UFG, beneficios estudiantiles UFG, becas UFG, JoinWork UFG, asesorías UFG' }
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
          <h1 class="heading-1">{{ data?.tituloPagina ?? 'Conexión U' }}</h1>
        </div>
      </section>

      <!-- Sección 1: Beneficios Estudiantiles (tabs) -->
      <ConexionUBeneficios
        v-if="data?.beneficiosTabs?.length"
        :tabs="data.beneficiosTabs"
      />

      <!-- Sección 2: Stories UFG (slider de videos) -->
      <ConexionUVideoSlider
        v-if="data?.videoSlider?.length"
        :items="data.videoSlider"
        :bg-image="data.bannerFondo"
      />

      <!-- Sección 3: Contactos / Asesorías -->
      <ConexionUContactos
        v-if="data?.contactos?.length"
        :contactos="data.contactos"
      />

      <!-- Sección 4: JoinWork -->
      <ConexionUJoinWork
        v-if="data?.joinWork"
        :imagen-izq="data.joinWork.imagenIzq"
        :parrafo="data.joinWork.parrafo"
      />
    </template>
  </div>
</template>
