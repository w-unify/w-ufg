<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { CareerData, ModalidadData, FacultadData, TipoTitulacionData } from '~/types/squidex'
import { useSquidexContent, resolveSquidexField } from '~/composables/useSquidexContent'
import { useSquidexAsset } from '~/composables/useSquidexAsset'

useScrollAnimations()

// Estado de filtros
const searchQuery = ref('')
const selectedModalidades = ref<string[]>([])
const selectedFacultades = ref<string[]>([])
const selectedCiclo = ref('')
const selectedTitulaciones = ref<string[]>([])

// Cargar opciones de filtros
// useAsyncData (dentro de useSquidexContent) maneja automáticamente:
// 1. SSR: Ejecuta en el servidor, datos incluidos en HTML inicial
// 2. Navegación cliente: Reutiliza datos cacheados por key única
// 3. Hydration: Transfiere datos del servidor al cliente sin re-fetch
const { content: modalidadesContent } = useSquidexContent<ModalidadData>('modalidades')
const { content: facultadesContent } = useSquidexContent<FacultadData>('facultades')
const { content: titulacionesContent } = useSquidexContent<TipoTitulacionData>('tipos-titulacion')

// Cargar todas las carreras sin filtros iniciales
const { content: carrerasContent } = useSquidexContent<CareerData>('carreras', { $top: 100 })


// Procesar opciones de filtros
const modalidades = computed(() => {
  if (!modalidadesContent.value) return []
  return modalidadesContent.value.map(m => ({
    id: m.id,
    nombre: resolveSquidexField<string>(m.data.modalidadNombre, 'es') || ''
  }))
})

const facultades = computed(() => {
  if (!facultadesContent.value) return []
  return facultadesContent.value.map(f => ({
    id: f.id,
    nombre: resolveSquidexField<string>(f.data.facultadNombre, 'es') || ''
  }))
})

const titulaciones = computed(() => {
  if (!titulacionesContent.value) return []
  return titulacionesContent.value.map(t => ({
    id: t.id,
    nombre: resolveSquidexField<string>(t.data.tipoTitulacionNombre, 'es') || ''
  }))
})

// Procesar carreras con filtros aplicados
const { firstAssetUrl } = useSquidexAsset()

const carreras = computed(() => {
  if (!carrerasContent.value) return []
  
  let filtered = carrerasContent.value.map(c => {
    const modalidadRef = resolveSquidexField<string[]>(c.data['modalidad-ref'], 'es')
    const modalidadId = modalidadRef?.[0]
    const modalidadObj = modalidadesContent.value?.find(m => m.id === modalidadId)
    const modalidadNombre = modalidadObj ? resolveSquidexField<string>(modalidadObj.data.modalidadNombre, 'es') : ''
    
    const facultadRef = resolveSquidexField<string[]>(c.data['facultad-ref'], 'es')
    const facultadId = facultadRef?.[0]
    
    const titulacionRef = resolveSquidexField<string[]>(c.data['tiposTitulacion-ref'], 'es')
    const titulacionId = titulacionRef?.[0]
    
    // Obtener imagen de que-vas-aprender-img
    const imagenIds = resolveSquidexField<string[]>(c.data['que-vas-aprender-img'], 'es')
    const imagenUrl = imagenIds && imagenIds.length > 0 ? firstAssetUrl(imagenIds) : ''
    
    const rawSlug = resolveSquidexField<string>(c.data.slug, 'iv')
      || resolveSquidexField<string>(c.data.slug, 'es')
      || resolveSquidexField<string>(c.data.slug, 'en')
      || ''
    const slug = rawSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

    return {
      id: c.id,
      nombre: resolveSquidexField<string>(c.data.nombre, 'es') || '',
      slug,
      descripcionCorta: resolveSquidexField<string>(c.data.descripcionCorta, 'es') || '',
      modalidad: modalidadNombre,
      modalidadId,
      facultadId,
      titulacionId,
      esASU: resolveSquidexField<boolean>(c.data.esASU, 'es') || false,
      duracion: resolveSquidexField<string>(c.data.duracion, 'es') || '',
      imagen: imagenUrl
    }
  })
  
  // Filtrar por modalidad
  if (selectedModalidades.value.length > 0) {
    filtered = filtered.filter(c => c.modalidadId && selectedModalidades.value.includes(c.modalidadId))
  }
  
  // Filtrar por facultad
  if (selectedFacultades.value.length > 0) {
    filtered = filtered.filter(c => c.facultadId && selectedFacultades.value.includes(c.facultadId))
  }
  
  // Filtrar por titulación
  if (selectedTitulaciones.value.length > 0) {
    filtered = filtered.filter(c => c.titulacionId && selectedTitulaciones.value.includes(c.titulacionId))
  }
  
  // Filtrar por búsqueda de texto
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(c => 
      c.nombre.toLowerCase().includes(query) ||
      c.descripcionCorta.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

// Manejo de filtros
const toggleModalidad = (id: string) => {
  const index = selectedModalidades.value.indexOf(id)
  if (index > -1) {
    selectedModalidades.value.splice(index, 1)
  } else {
    selectedModalidades.value.push(id)
  }
}

const toggleFacultad = (id: string) => {
  const index = selectedFacultades.value.indexOf(id)
  if (index > -1) {
    selectedFacultades.value.splice(index, 1)
  } else {
    selectedFacultades.value.push(id)
  }
}

const toggleTitulacion = (id: string) => {
  const index = selectedTitulaciones.value.indexOf(id)
  if (index > -1) {
    selectedTitulaciones.value.splice(index, 1)
  } else {
    selectedTitulaciones.value.push(id)
  }
}

const clearAllFilters = () => {
  selectedModalidades.value = []
  selectedFacultades.value = []
  selectedCiclo.value = ''
  selectedTitulaciones.value = []
  searchQuery.value = ''
}

const clearSearch = () => {
  searchQuery.value = ''
}

// Chips de filtros activos
const activeFilters = computed(() => {
  const filters: Array<{ type: string; id: string; label: string }> = []
  
  if (modalidades.value && selectedModalidades.value) {
    selectedModalidades.value.forEach(id => {
      const modalidad = modalidades.value.find(m => m.id === id)
      if (modalidad) {
        filters.push({ type: 'modalidad', id, label: modalidad.nombre })
      }
    })
  }
  
  if (facultades.value && selectedFacultades.value) {
    selectedFacultades.value.forEach(id => {
      const facultad = facultades.value.find(f => f.id === id)
      if (facultad) {
        filters.push({ type: 'facultad', id, label: facultad.nombre })
      }
    })
  }
  
  if (titulaciones.value && selectedTitulaciones.value) {
    selectedTitulaciones.value.forEach(id => {
      const titulacion = titulaciones.value.find(t => t.id === id)
      if (titulacion) {
        filters.push({ type: 'titulacion', id, label: titulacion.nombre })
      }
    })
  }
  
  return filters
})

const removeFilter = (filter: { type: string; id: string }) => {
  if (filter.type === 'modalidad') {
    toggleModalidad(filter.id)
  } else if (filter.type === 'facultad') {
    toggleFacultad(filter.id)
  } else if (filter.type === 'titulacion') {
    toggleTitulacion(filter.id)
  }
}

// Dropdowns
const modalidadDropdownOpen = ref(false)
const facultadDropdownOpen = ref(false)
const cicloDropdownOpen = ref(false)
const titulacionDropdownOpen = ref(false)

const filtrosRef = ref<HTMLElement | null>(null)

const closeAllDropdowns = () => {
  modalidadDropdownOpen.value = false
  facultadDropdownOpen.value = false
  cicloDropdownOpen.value = false
  titulacionDropdownOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const insideFiltros = filtrosRef.value && filtrosRef.value.contains(target)
  const insideTeleport = target.closest('[data-dropdown-teleport]')
  if (!insideFiltros && !insideTeleport) {
    closeAllDropdowns()
  }
}

// Posición de cada dropdown (para position fixed)
const dropdownRects = ref<Record<string, { top: number; left: number; width: number }>>({}) 

const updateDropdownRect = (key: string, el: HTMLElement | null) => {
  if (!el) return
  const rect = el.getBoundingClientRect()
  dropdownRects.value[key] = {
    top: rect.bottom,
    left: rect.left,
    width: rect.width
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))


// Opciones de ciclo (estáticas)
const ciclosOptions = [
  { id: '01', nombre: 'Ciclo 01' },
  { id: '02', nombre: 'Ciclo 02' }
]

useHead({
  title: 'Oferta Académica - UFG',
  meta: [
    { name: 'description', content: 'Descubre todas las carreras universitarias que ofrece la Universidad Francisco Gavidia.' }
  ]
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative z-10 pt-[30px] xl:pt-[40px] 2xl:pt-[70px] pb-[20px]">
      <div class="container mx-auto max-w-[1400px] px-6">
        
        <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-5 xl:mb-12">
          <!-- Titulo -->
          <h1 class="heading-1 reveal">Oferta <br>académica</h1>
          
          <!-- Buscador -->
          <div class="relative w-full xl:w-[450px]">
            <div class="relative flex items-center fade delay-400">
              <div class="absolute left-5 w-5 h-5 flex items-center justify-center pointer-events-none">
                <img src="/img/carreras/search-line.svg" class="w-full h-full" alt="search">
              </div>
              <!-- Input buscar -->
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Buscar carrera..." 
                class="w-full bg-primary/5 border border-primary rounded-xl py-2 pl-14 pr-6 text-dark text-sm placeholder:text-primary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all"
              >
              <!-- Boton clear -->
              <button 
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-4 w-8 h-8 flex items-center justify-center text-dark/30 hover:text-accent transition-colors" 
                title="Limpiar búsqueda"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Filtros -->
        <div ref="filtrosRef" class="relative z-50 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 fade filterbox delay-400">
          <!-- Modalidad -->
          <div class="relative">
            <button 
              @click="(e) => { updateDropdownRect('modalidad', (e.currentTarget as HTMLElement).parentElement); modalidadDropdownOpen = !modalidadDropdownOpen }"
              class="filter-dropdown-btn"
            >
              <span class="text-dark/80">Modalidad</span>
              <img src="/img/globals/down-arrow.svg" class="w-5 h-5 transition-transform" :class="{ 'rotate-180': modalidadDropdownOpen }" alt="arrow">
            </button>
            <Teleport to="body">
              <div 
                v-if="modalidadDropdownOpen && dropdownRects['modalidad']"
                :style="{ position: 'fixed', top: dropdownRects['modalidad'].top + 'px', left: dropdownRects['modalidad'].left + 'px', width: dropdownRects['modalidad'].width + 'px', zIndex: 9999 }"
                data-dropdown-teleport
                class="bg-white border border-dark/10 rounded-xl shadow-xl py-2 max-h-[300px] overflow-y-auto"
              >
                <div v-if="modalidades.length === 0" class="px-5 py-3 text-dark/50 text-sm">Cargando...</div>
                <label v-for="modalidad in modalidades" :key="modalidad.id" class="filter-option">
                  <input type="checkbox" :checked="selectedModalidades.includes(modalidad.id)" @change="toggleModalidad(modalidad.id)" class="filter-checkbox">
                  <span class="ml-3">{{ modalidad.nombre }}</span>
                </label>
              </div>
            </Teleport>
          </div>

          <!-- Áreas de interés (Facultades) -->
          <div class="relative">
            <button 
              @click="(e) => { updateDropdownRect('facultad', (e.currentTarget as HTMLElement).parentElement); facultadDropdownOpen = !facultadDropdownOpen }"
              class="filter-dropdown-btn"
            >
              <span class="text-dark/80">Áreas de interés</span>
              <img src="/img/globals/down-arrow.svg" class="w-5 h-5 transition-transform" :class="{ 'rotate-180': facultadDropdownOpen }" alt="arrow">
            </button>
            <Teleport to="body">
              <div 
                v-if="facultadDropdownOpen && dropdownRects['facultad']"
                :style="{ position: 'fixed', top: dropdownRects['facultad'].top + 'px', left: dropdownRects['facultad'].left + 'px', width: dropdownRects['facultad'].width + 'px', zIndex: 9999 }"
                data-dropdown-teleport
                class="bg-white border border-dark/10 rounded-xl shadow-xl py-2 max-h-[300px] overflow-y-auto"
              >
                <label v-for="facultad in facultades" :key="facultad.id" class="filter-option">
                  <input type="checkbox" :checked="selectedFacultades.includes(facultad.id)" @change="toggleFacultad(facultad.id)" class="filter-checkbox">
                  <span class="ml-3">{{ facultad.nombre }}</span>
                </label>
              </div>
            </Teleport>
          </div>

          <!-- Ciclo -->
          <div class="relative">
            <button 
              @click="(e) => { updateDropdownRect('ciclo', (e.currentTarget as HTMLElement).parentElement); cicloDropdownOpen = !cicloDropdownOpen }"
              class="filter-dropdown-btn"
            >
              <span class="text-dark/80">Ciclo</span>
              <img src="/img/globals/down-arrow.svg" class="w-5 h-5 transition-transform" :class="{ 'rotate-180': cicloDropdownOpen }" alt="arrow">
            </button>
            <Teleport to="body">
              <div 
                v-if="cicloDropdownOpen && dropdownRects['ciclo']"
                :style="{ position: 'fixed', top: dropdownRects['ciclo'].top + 'px', left: dropdownRects['ciclo'].left + 'px', width: dropdownRects['ciclo'].width + 'px', zIndex: 9999 }"
                data-dropdown-teleport
                class="bg-white border border-dark/10 rounded-xl shadow-xl py-2 max-h-[300px] overflow-y-auto"
              >
                <label v-for="ciclo in ciclosOptions" :key="ciclo.id" class="filter-option">
                  <input type="radio" name="ciclo" :checked="selectedCiclo === ciclo.id" @change="selectedCiclo = ciclo.id" class="filter-checkbox">
                  <span class="ml-3">{{ ciclo.nombre }}</span>
                </label>
              </div>
            </Teleport>
          </div>

          <!-- Titulación -->
          <div class="relative">
            <button 
              @click="(e) => { updateDropdownRect('titulacion', (e.currentTarget as HTMLElement).parentElement); titulacionDropdownOpen = !titulacionDropdownOpen }"
              class="filter-dropdown-btn"
            >
              <span class="text-dark/80">Titulación</span>
              <img src="/img/globals/down-arrow.svg" class="w-5 h-5 transition-transform" :class="{ 'rotate-180': titulacionDropdownOpen }" alt="arrow">
            </button>
            <Teleport to="body">
            <div v-if="titulacionDropdownOpen && dropdownRects['titulacion']" 
              :style="{ position: 'fixed', top: dropdownRects['titulacion'].top + 'px', left: dropdownRects['titulacion'].left + 'px', width: dropdownRects['titulacion'].width + 'px', zIndex: 9999 }"
              data-dropdown-teleport
              class="bg-white border border-dark/10 rounded-xl shadow-xl py-2 max-h-[300px] overflow-y-auto"
            >
              <label 
                v-for="titulacion in titulaciones" 
                :key="titulacion.id"
                class="filter-option"
              >
                <input 
                  type="checkbox" 
                  :checked="selectedTitulaciones.includes(titulacion.id)"
                  @change="toggleTitulacion(titulacion.id)"
                  class="filter-checkbox"
                >
                <span class="ml-3">{{ titulacion.nombre }}</span>
              </label>
            </div>
            </Teleport>
          </div>
        </div>

        <!-- Filtros seleccionados -->
        <div 
          v-if="activeFilters.length > 0"
          class="bg-primary/5 rounded-xl p-4 flex flex-wrap items-center gap-3"
        >
          <span class="font-futura-bold text-dark text-sm mr-2">Filtros:</span>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="filter in activeFilters"
              :key="`${filter.type}-${filter.id}`"
              @click="removeFilter(filter)"
              class="inline-flex items-center gap-2 bg-primary text-white text-xs px-3 py-1.5 rounded-full hover:bg-accent transition-colors"
            >
              <span>{{ filter.label }}</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <button 
            @click="clearAllFilters"
            class="ml-auto text-xs text-primary px-4 py-2 rounded-full bg-primary/15 hover:bg-accent hover:text-white hover:border-accent transition-all"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </section>

    <!-- CARRERAS -->
    <section class="pt-10 pb-16 xl:pt-10 xl:pb-20 bg-muted">
      <div class="container mx-auto max-w-[1400px] px-6">
        
        <!-- Loading state -->
        <div v-if="!carrerasContent" class="text-center py-20">
          <p class="text-dark/60">Cargando carreras...</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="carreras.length === 0" class="text-center py-20">
          <p class="text-dark/60 text-lg">No se encontraron carreras con los filtros seleccionados.</p>
          <button 
            @click="clearAllFilters"
            class="mt-4 text-primary hover:text-accent transition-colors underline"
          >
            Limpiar filtros
          </button>
        </div>

        <!-- Grid de carreras -->
        <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          <OfertaCareerCard
            v-for="carrera in carreras"
            :key="carrera.id"
            :nombre="carrera.nombre"
            :slug="carrera.slug"
            :descripcion-corta="carrera.descripcionCorta"
            :modalidad="carrera.modalidad"
            :es-a-s-u="carrera.esASU"
            :imagen="carrera.imagen"
          />
        </div>
      </div>
    </section>
  </div>
</template>
