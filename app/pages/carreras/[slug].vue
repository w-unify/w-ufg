<script setup lang="ts">
import { resolveSquidexField } from '~/composables/useSquidexContent'
import { useSquidexAsset } from '~/composables/useSquidexAsset'
import type { CareerData, DetalleCarreraData, BecaFinanciamientoData, PensumCicloResolved } from '~/types/squidex'
import type { SquidexContent } from '~/types/squidex'

useScrollAnimations()

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { firstAssetUrl } = useSquidexAsset()

const { data, pending, error } = useAsyncData(
  `detalle-carrera-${slug.value}`,
  () => $fetch<{ carrera: SquidexContent<CareerData>; detalle: SquidexContent<DetalleCarreraData> | null; modalidadNombre: string; pensumResuelto: PensumCicloResolved[] }>(
    '/api/squidex/detalle-carrera',
    { params: { slug: slug.value } }
  )
)

const carrera = computed(() => data.value?.carrera?.data ?? null)
const detalle = computed(() => data.value?.detalle?.data ?? null)

// --- Hero ---
const heroTitle = computed(() => resolveSquidexField<string>(carrera.value?.nombre, 'es') || '')
const heroDescription = computed(() => resolveSquidexField<string>(carrera.value?.['de-que-trata'], 'es') || '')
const heroImage = computed(() => firstAssetUrl(resolveSquidexField<string[]>(carrera.value?.['que-vas-aprender-img'], 'es')))
const heroModality = computed(() => data.value?.modalidadNombre || '')
const heroDuration = computed(() => resolveSquidexField<string>(carrera.value?.duracion, 'es') || '')
const heroEsASU = computed(() => resolveSquidexField<boolean>(carrera.value?.esASU, 'iv') ?? false)
const heroDegree = computed(() => {
  if (heroEsASU.value) return 'Doble Titulación'
  return resolveSquidexField<string>(carrera.value?.degree, 'es') || ''
})

// --- Descubre tu carrera ---
const discoverAboutText = computed(() => resolveSquidexField<string>(carrera.value?.['de-que-trata'], 'es') || '')
const discoverLearnText = computed(() => resolveSquidexField<string>(carrera.value?.['que-vas-aprender'], 'es') || '')
const discoverLearnImage = computed(() => firstAssetUrl(resolveSquidexField<string[]>(carrera.value?.['que-vas-aprender-img'], 'es')))

// --- ¿En qué vas a trabajar? ---
const workPositions = computed(() => {
  const raw = resolveSquidexField<any>(carrera.value?.['en-que-trabajar'], 'es')
  if (!raw?.items) return []
  return raw.items.map((item: any) => item.texto || '')
})

// --- Doble titulación ---
const ufgDegree = computed(() => resolveSquidexField<string>(carrera.value?.nombre, 'es') || '')
const asuDegree = computed(() => resolveSquidexField<string>(carrera.value?.['doble-titulo-nombre'], 'es') || '')
const dualImage = computed(() => firstAssetUrl(resolveSquidexField<string[]>(carrera.value?.['doble-titulacion-img'], 'es')))

// --- Pensum ---
const pensumResuelto = computed(() => data.value?.pensumResuelto ?? [])
const pensumBtnNombre = computed(() => resolveSquidexField<string>(carrera.value?.pensumBtnNombre, 'es') || 'DESCARGAR PENSUM')
const pensumBtnUrl = computed(() => resolveSquidexField<string>(carrera.value?.pensumBtnUrl, 'es') || '')

// --- Valor del semestre ---
const valorSemestre = computed(() => resolveSquidexField<any>(carrera.value?.valorSemestre, 'es'))
const costItems = computed(() => {
  const vs = valorSemestre.value
  if (!vs?.filasCostos) return undefined
  return vs.filasCostos.map((f: any) => ({ label: f.concepto, amount: f.monto }))
})
const totalLabel = computed(() => valorSemestre.value?.totalTexto || '')
const totalAmount = computed(() => valorSemestre.value?.totalMonto || '')
const disclaimers = computed(() => {
  const nota = valorSemestre.value?.notasLegales as string | undefined
  if (!nota) return undefined
  // Primero dividir por saltos de línea, luego por "* " al inicio de cada nota
  const lines = nota.split(/\n/).map(s => s.trim()).filter(s => s.length > 0)
  // Si solo hay 1 línea (todo en un bloque), separar por "* " como delimitador
  if (lines.length <= 1) {
    return nota.split(/(?=\* )/).map(s => s.trim()).filter(s => s.length > 0)
  }
  return lines
})

// --- Becas y financiamiento ---
const becas = computed(() => {
  const raw = resolveSquidexField<BecaFinanciamientoData>(detalle.value?.becasFinanciamientos, 'es')
  if (!raw?.items) return undefined
  return {
    sectionTitle: raw.titulo || 'Becas y financiación',
    items: raw.items.map((item: any) => ({
      title: item.titulo,
      content: item.parrafo,
      image: firstAssetUrl(item.imagen)
    }))
  }
})

// --- Testimonios ---
const testimonios = computed(() => resolveSquidexField<any[]>(detalle.value?.testimoniosEgresados, 'es') || [])

useHead({
  title: computed(() => heroTitle.value ? `${heroTitle.value} - UFG` : 'Carrera - UFG'),
  meta: [
    { name: 'description', content: computed(() => heroDescription.value || 'Detalle de carrera - Universidad Francisco Gavidia') }
  ]
})
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center min-h-[60vh]">
      <p class="font-futura-bold text-primary text-xl animate-pulse">Cargando...</p>
    </div>

    <!-- Error / Not found -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[60vh] px-6">
      <div class="text-center max-w-md">
        <h2 class="font-futura-bold text-2xl text-dark mb-4">Carrera no encontrada</h2>
        <p class="text-dark/70 text-sm mb-6">No se encontró la carrera solicitada.</p>
        <NuxtLink to="/oferta-academica" class="btn-primary btn-nm group">
          <span>Ver oferta académica</span>
          <div class="btn-circle"></div>
        </NuxtLink>
      </div>
    </div>

    <!-- Contenido dinámico -->
    <template v-else-if="carrera">
      <CarreraCareerHero
        :title="heroTitle"
        :description="heroDescription"
        :image="heroImage || undefined"
        :modality="heroModality"
        :duration="heroDuration"
        :degree="heroDegree"
        :asu-enriched="heroEsASU"
      />

      <CarreraDiscoverCareer
        :about-text="discoverAboutText"
        :learn-text="discoverLearnText"
        :learn-image="discoverLearnImage || undefined"
      />

      <CarreraWorkPositions
        v-if="workPositions.length > 0"
        :positions="workPositions"
      />

      <CarreraDualDegreeSection
        v-if="asuDegree"
        :ufg-degree="ufgDegree"
        :asu-degree="asuDegree"
        :program-image="dualImage || undefined"
      />

      <CarreraPensum
        v-if="pensumResuelto.length > 0"
        :ciclos="pensumResuelto"
        :btn-nombre="pensumBtnNombre"
        :btn-url="pensumBtnUrl"
      />

      <CarreraAdmissionCards />

      <CarreraSemesterCost
        v-if="costItems"
        :items="costItems"
        :total-label="totalLabel"
        :total-amount="totalAmount"
        :disclaimers="disclaimers"
      />

      <CarreraScholarshipsAccordion
        v-if="becas"
        :section-title="becas.sectionTitle"
        :items="becas.items"
      />
    </template>
  </div>
</template>
