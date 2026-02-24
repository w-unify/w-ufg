<script setup lang="ts">
interface PasoAdmision {
  numero: string
  titulo: string
  descripcion: string
  icono: string
}

interface StepCard {
  numero: number
  contenido: string
}

interface TabContent {
  id: string
  label: string
  pasos: StepCard[]
  notas: string[]
}

interface Boton {
  texto: string
  enlace: string
}

interface PovData {
  titulo: string
  subtitulo: string
  descripcion: string
  areasTitulo: string
  areas: string[]
  pasosTitulo: string
  pasos: string[]
  agendaTitulo: string
  botones: Boton[]
}

interface CostoFila {
  label: string
  monto: string
}

interface CostoData {
  tituloSeccion: string
  filas: CostoFila[]
  totalLabel: string
  totalMonto: string
  notas: string[]
}

interface BeneficioItem {
  titulo: string
  descripcion: string
  imagen: string
}

interface BeneficiosData {
  titulo: string
  logoUrl?: string
  items: BeneficioItem[]
}

interface PostgradoPaso {
  numero: number
  contenido: string
  ctaText: string
  ctaLink: string
  lista: string[]
}

interface PostgradoTab {
  id: string
  label: string
  pasos: PostgradoPaso[]
  notas: string[]
}

interface AdmisionesData {
  pasos: PasoAdmision[]
  tabs: TabContent[]
  pov: PovData | null
  costo: CostoData | null
  beneficios: BeneficiosData | null
  postgradoTabs: PostgradoTab[]
}

useScrollAnimations()

const { data, pending, error } = await useFetch<AdmisionesData>('/api/squidex/pagina-admisiones')

useHead({
  title: 'Admisiones - UFG',
  meta: [
    { name: 'description', content: 'Forma parte de la UFG Powered By ASU. Conoce los requisitos de admisión para pregrado, doble titulación y postgrado.' },
    { name: 'keywords', content: 'requisitos ufg, admisiones UFG, ciclos ufg, reingreso ufg, nuevo ingreso ufg, ingreso por equivalencias ufg' }
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
      <section class="relative pt-[30px] xl:pt-[40px] pb-[35px] xl:pb-[40px]">
        <div class="container mx-auto max-w-[1400px] px-5">
          <h1 class="heading-1 reveal">Admisiones</h1>
        </div>
      </section>

      <!-- Pasos de Solicitud de Admisión -->
      <AdmisionesPasosAdmision
        v-if="data?.pasos?.length"
        :pasos="data.pasos"
      />

      <!-- Requisitos de Admisión de Pregrado -->
      <AdmisionesRequisitosPregrado
        v-if="data?.tabs?.length"
        :tabs="data.tabs"
      />

      <!-- Prueba de Orientación Vocacional -->
      <AdmisionesPruebaVocacional
        v-if="data?.pov"
        :titulo="data.pov.titulo"
        :subtitulo="data.pov.subtitulo"
        :descripcion="data.pov.descripcion"
        :areas="data.pov.areas"
        :pasos="data.pov.pasos"
        :botones="data.pov.botones"
      />

      <!-- Doble Titulación (video + requisitos + costos) -->
      <AdmisionesDobleTitulacion
        v-if="data?.costo"
        :costos="data.costo.filas"
        :total-label="data.costo.totalLabel"
        :total-monto="data.costo.totalMonto"
        :notas="data.costo.notas"
      />

      <!-- Beneficios UFG+ASU -->
      <AdmisionesBeneficiosASU
        v-if="data?.beneficios"
        :section-title="data.beneficios.titulo"
        :beneficios="data.beneficios.items"
        :logo-url="data.beneficios.logoUrl || '/img/admisiones/ufg-y-asu.webp'"
      />

      <!-- Requisitos de Admisión de Postgrado -->
      <AdmisionesRequisitosPostgrado
        v-if="data?.postgradoTabs?.length"
        :pasos="data.postgradoTabs[0]?.pasos"
      />
    </template>
  </div>
</template>
