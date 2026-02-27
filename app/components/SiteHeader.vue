<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { HeaderData, CareerData } from '~/types/squidex'
import { useSquidexContent, resolveSquidexField } from '~/composables/useSquidexContent'

const topBarVisible = ref(true)
const navbarShadow = ref(false)

const handleScroll = () => {
  const scrollY = window.scrollY
  
  if (scrollY > 40) {
    topBarVisible.value = false
    navbarShadow.value = true
  } else {
    topBarVisible.value = true
    navbarShadow.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Cargar datos del header desde Squidex
const { content: headerContent } = useSquidexContent<HeaderData>('header', { $top: 1 })
const header = computed(() => headerContent.value?.[0]?.data ?? null)

const linkPortalEducativo = computed(() => resolveSquidexField<string>(header.value?.linkPortalEducativo, 'es') || '#')
const linkWebDesktop = computed(() => resolveSquidexField<string>(header.value?.linkWebDesktop, 'es') || 'https://webdesktop.ufg.edu.sv/')
const linkUVirtual = computed(() => resolveSquidexField<string>(header.value?.linkUVirtual, 'es') || '#')
const linkTramites = computed(() => resolveSquidexField<string>(header.value?.linkTramites, 'es') || 'https://www.ufg.edu.sv/tramites-en-linea/')
const nombreBtn = computed(() => resolveSquidexField<string>(header.value?.nombreBtn, 'es') || 'APLICAR')
const linkBtnAplicar = computed(() => resolveSquidexField<string>(header.value?.linkBtnAplicar, 'es') || 'https://admisiones.ufg.edu.sv/solicitud/')

// Buscador de carreras
const { content: carrerasContent } = useSquidexContent<CareerData>('carreras', { $top: 100 })
const searchQuery = ref('')
const searchOpen = ref(false)
const searchRef = ref<HTMLElement | null>(null)
const router = useRouter()

const carrerasFiltradas = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q || q.length < 2) return []
  return (carrerasContent.value || []).map(c => ({
    nombre: resolveSquidexField<string>(c.data.nombre, 'es') || '',
    slug: resolveSquidexField<string>(c.data.slug, 'es') || ''
  })).filter(c => c.nombre.toLowerCase().includes(q)).slice(0, 8)
})

const onSearchInput = () => {
  searchOpen.value = true
}

const selectCarrera = (slug: string) => {
  searchQuery.value = ''
  searchOpen.value = false
  router.push(`/carreras/${slug}`)
}

const handleClickOutsideSearch = (e: MouseEvent) => {
  if (searchRef.value && !searchRef.value.contains(e.target as Node)) {
    searchOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  document.addEventListener('click', handleClickOutsideSearch)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutsideSearch)
})
</script>

<template>
  <header id="mainHeader" class="w-full z-[100] fixed top-0 left-0 transition-all duration-300">
    
    <!-- Top Bar (solo desktop) -->
    <div 
      v-show="topBarVisible"
      id="topBar" 
      class="hidden xl:block bg-primary py-2 px-6 border-b border-white/10 transition-all duration-300"
    >
      <div class="container mx-auto max-w-[1200px] grid grid-cols-[1fr_380px] items-center gap-12">
        
        <div class="flex items-center justify-end gap-6 2xl:gap-8">
          <a :href="linkPortalEducativo" class="flex items-center gap-3 text-white text-[13px] hover:text-gray-300 transition-all font-medium group">
            <div class="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center group-hover:border-gray-300 transition-all">
              <img src="/img/globals/portal-del-estudiante.svg" class="w-5 h-5 transition-all group-hover:brightness-0 group-hover:invert-[0.8]" alt="Portal">
            </div>
            Portal del Estudiante
          </a>
          <a :href="linkWebDesktop" target="_blank" rel="noopener" class="flex items-center gap-3 text-white text-[13px] hover:text-gray-300 transition-all font-medium group">
            <div class="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center group-hover:border-gray-300 transition-all">
              <img src="/img/globals/web-desktop.svg" class="w-5 h-5 transition-all group-hover:brightness-0 group-hover:invert-[0.8]" alt="Web">
            </div>
            Web Desktop
          </a>
          <a :href="linkUVirtual" class="flex items-center gap-3 text-white text-[13px] hover:text-gray-300 transition-all font-medium group">
            <div class="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center group-hover:border-gray-300 transition-all">
              <img src="/img/globals/u-virtual.svg" class="w-5 h-5 transition-all group-hover:brightness-0 group-hover:invert-[0.8]" alt="U Virtual">
            </div>
            U Virtual
          </a>
          <a :href="linkTramites" target="_blank" rel="noopener" class="flex items-center gap-3 text-white text-[13px] hover:text-gray-300 transition-all font-medium group">
            <div class="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center group-hover:border-gray-300 transition-all">
              <img src="/img/globals/tramites.svg" class="w-5 h-5 transition-all group-hover:brightness-0 group-hover:invert-[0.8]" alt="Trámites">
            </div>
            Trámites
          </a>
        </div>

        <div ref="searchRef" class="relative w-full">
          <div class="relative flex items-center">
            <div class="absolute left-4 w-4 h-4 flex items-center justify-center pointer-events-none">
              <img src="/img/carreras/search-line.svg" class="w-full h-full invert opacity-60" alt="search">
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar carrera..." 
              class="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-11 pr-10 text-white text-xs placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
              @input="onSearchInput"
              @focus="searchOpen = true"
              @keyup.enter="searchQuery.trim() && router.push(`/oferta-academica?q=${encodeURIComponent(searchQuery.trim())}`)"
              autocomplete="off"
            >
            <!-- Botón X para limpiar -->
            <button 
              v-if="searchQuery"
              @click="searchQuery = ''; searchOpen = false"
              class="absolute right-3 w-5 h-5 flex items-center justify-center text-white/50 hover:text-white transition-colors" 
              title="Limpiar búsqueda"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <!-- Dropdown resultados -->
          <div 
            v-if="searchOpen && carrerasFiltradas.length > 0"
            class="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-xl overflow-hidden z-[200] border border-dark/10"
          >
            <button
              v-for="carrera in carrerasFiltradas"
              :key="carrera.slug"
              @click="selectCarrera(carrera.slug)"
              class="w-full text-left px-4 py-3 text-dark text-sm hover:bg-primary/5 hover:text-primary transition-colors border-b border-dark/5 last:border-0 flex items-center gap-3"
            >
              <img src="/img/carreras/search-line.svg" class="w-3.5 h-3.5 opacity-30 shrink-0" alt="">
              <span>{{ carrera.nombre }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navbar principal -->
    <nav 
      id="mainNavbar" 
      :class="[
        'w-full bg-primary xl:bg-white h-[80px] xl:h-[115px] border-b border-[#CDCCCC] transition-all duration-300',
        { 'shadow-lg': navbarShadow }
      ]"
    >
      <div class="container mx-auto max-w-[1400px] h-full flex items-center justify-between px-6 xl:grid xl:[grid-template-columns:auto_1fr_auto]">
        
        <div class="shrink-0">
          <NuxtLink to="/">
            <img src="/img/globals/logo-ufg-asu.svg" class="hidden xl:block h-[45px] w-auto" alt="UFG Logo">
            <img src="/img/globals/logo-ufg-asu-mobile.svg" class="block xl:hidden h-[30px] w-auto" alt="UFG Logo">
          </NuxtLink>
        </div>

        <ul class="hidden xl:flex justify-center items-center gap-8 2xl:gap-12 whitespace-nowrap font-medium">
          <li><NuxtLink to="/oferta-academica" class="nav-link">Oferta Académica</NuxtLink></li>
          
          <!-- Menú Admisiones -->
          <li class="group/mega static">
            <NuxtLink to="/admisiones" class="nav-link flex items-center gap-2 py-10">
              Admisiones <img src="/img/globals/down-arrow.svg" class="w-3 transition-transform group-hover/mega:rotate-180" alt="arrow">
            </NuxtLink>
            <div class="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] bg-[#F5F5F5] border-x border-b border-dark/5 opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible transition-all duration-300 z-[90]">
              <div class="py-12 px-10 grid grid-cols-[170px_1fr_1fr_1fr] gap-10">
                <NuxtLink to="/admisiones" class="text-2xl font-futura-bold text-dark">Admisiones</NuxtLink>
                <div>
                  <NuxtLink to="/admisiones" class="font-futura-bold text-dark mb-4 text-lg">Pregrado</NuxtLink>
                  <ul class="space-y-3 text-base text-dark/70 pt-3">
                    <li><NuxtLink to="/admisiones#pasos" class="hover:text-primary transition-colors">Pasos de Solicitud de Admisión</NuxtLink></li>
                    <li><NuxtLink to="/admisiones#nuevo-ingreso" class="hover:text-primary transition-colors">Nuevo Ingreso</NuxtLink></li>
                    <li><NuxtLink to="/admisiones#equivalencias" class="hover:text-primary transition-colors">Ingreso por Equivalencias</NuxtLink></li>
                  </ul>
                </div>
                <div>
                  <NuxtLink to="/admisiones#doble-titulacion" class="font-futura-bold text-dark mb-4 text-lg">Doble Titulación</NuxtLink>
                  <ul class="space-y-3 text-base text-dark/70 pt-3">
                    <li><NuxtLink to="/admisiones#doble-titulacion" class="hover:text-primary transition-colors">Programas de Doble Titulación</NuxtLink></li>
                    <li><NuxtLink to="/admisiones#costos" class="hover:text-primary transition-colors">Costos del Programa</NuxtLink></li>
                  </ul>
                </div>
                <div>
                  <NuxtLink to="/admisiones#postgrado" class="font-futura-bold text-dark mb-4 text-lg">Postgrado</NuxtLink>
                  <ul class="space-y-3 text-base text-dark/70 pt-3">
                    <li><NuxtLink to="/admisiones#postgrado" class="hover:text-primary transition-colors">Requisitos de Admisión</NuxtLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <!-- Menú Experiencia Estudiantil -->
          <li class="group/mega static">
            <NuxtLink to="/experiencia-estudiantil" class="nav-link flex items-center gap-2 py-10">
              Experiencia Estudiantil <img src="/img/globals/down-arrow.svg" class="w-3 transition-transform group-hover/mega:rotate-180" alt="arrow">
            </NuxtLink>
            <div class="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] bg-[#F5F5F5] border-x border-b border-dark/5 opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible transition-all duration-300 z-[90]">
              <div class="py-12 px-10 grid grid-cols-[170px_1fr_1fr_1fr] gap-10">
                <h2 class="text-2xl font-futura-bold text-dark">Experiencia <br> Estudiantil</h2>
                <div>
                  <NuxtLink to="/vida-estudiantil" class="font-futura-bold text-dark mb-4 text-lg">Vida Estudiantil</NuxtLink>
                  <ul class="space-y-3 text-base text-dark/70 pt-3">
                    <li><NuxtLink to="/vida-estudiantil#calendario" class="hover:text-primary transition-colors">Calendario Académico</NuxtLink></li>
                    <li><NuxtLink to="/vida-estudiantil#eventos" class="hover:text-primary transition-colors">Eventos</NuxtLink></li>
                  </ul>
                </div>
                <div>
                  <NuxtLink to="/smart-u" class="font-futura-bold text-dark mb-4 text-lg">Smart U</NuxtLink>
                  <ul class="space-y-3 text-base text-dark/70 pt-3">
                    <li><NuxtLink to="/smart-u#reinscripcion" class="hover:text-primary transition-colors">Reinscripción</NuxtLink></li>
                    <li><NuxtLink to="/smart-u#beneficios" class="hover:text-primary transition-colors">Beneficios y Descuentos</NuxtLink></li>
                  </ul>
                </div>
                <div>
                  <NuxtLink to="/conexion-u" class="font-futura-bold text-dark mb-4 text-lg">Conexión U</NuxtLink>
                  <ul class="space-y-3 text-base text-dark/70 pt-3">
                    <li><NuxtLink to="/conexion-u#asesorias" class="hover:text-primary transition-colors">Asesorías</NuxtLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li><NuxtLink to="/powered-by-asu" class="nav-link">Powered by ASU</NuxtLink></li>
        </ul>

        <div class="flex items-center justify-end gap-[20px] flex-shrink-0">
          <a :href="linkBtnAplicar" target="_blank" rel="noopener" class="btn-header group btn-sm xl:btn-lg">
            <span>{{ nombreBtn }}</span>
            <div class="btn-circle"></div>
          </a>
          <button class="xl:hidden">
            <img src="/img/globals/hamburguer.svg" class="w-8" alt="Menu">
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
