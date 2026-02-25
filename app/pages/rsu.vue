<script setup lang="ts">
interface CuadriculaItem {
  parrafo: string
  imagen: string
}

interface BeneficioItem {
  imagenCircular: string
  parrafo: string
}

interface ColaboradorItem {
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

interface RsuPageData {
  tituloPagina: string
  cuadricula: CuadriculaItem[]
  beneficiosTitulo: string
  beneficios: BeneficioItem[]
  colaboradoresTitulo: string
  colaboradoresFondo: string
  colaboradores: ColaboradorItem[]
  marcoTitulo: string
  marcoTabs: Tab[]
}

useScrollAnimations()

const { data, pending, error } = await useFetch<RsuPageData>('/api/squidex/pagina-rsu')

useHead({
  title: 'RSU - UFG',
  meta: [
    { name: 'description', content: 'Responsabilidad Social Universitaria UFG: voluntariado, beneficios estudiantiles y marco estratégico de sostenibilidad.' },
    { name: 'keywords', content: 'RSU UFG, responsabilidad social UFG, voluntariado UFG, sostenibilidad UFG' }
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
          <div class="heading-1" v-html="data?.tituloPagina ?? 'Responsabilidad Social Universitaria'"></div>
        </div>
      </section>

      <!-- Sección 1: Cuadrícula 2x2 con imagen + overlay -->
      <RsuCuadricula
        v-if="data?.cuadricula?.length"
        :items="data.cuadricula"
      />

      <!-- Sección 2: Beneficios estudiantes (slider imagen circular) -->
      <RsuBeneficiosEstudiantes
        v-if="data?.beneficios?.length"
        :titulo="data.beneficiosTitulo"
        :items="data.beneficios"
      />

      <!-- Sección 3: Colaboradores (slider cards sobre fondo imagen oscuro) -->
      <RsuColaboradores
        v-if="data?.colaboradores?.length"
        :titulo="data.colaboradoresTitulo"
        :fondo="data.colaboradoresFondo"
        :items="data.colaboradores"
      />

      <!-- Sección 4: Marco Estratégico (tabs) -->
      <RsuMarcoEstrategico
        v-if="data?.marcoTabs?.length"
        :titulo="data.marcoTitulo"
        :tabs="data.marcoTabs"
      />

    </template>
  </div>
</template>
