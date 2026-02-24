<script setup lang="ts">
interface Beneficio {
  titulo: string
  descripcion: string
  imagen?: string
}

interface Props {
  sectionTitle?: string
  beneficios?: Beneficio[]
  ctaText?: string
  ctaLink?: string
  logoUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: 'Beneficios UFG+ASU',
  beneficios: () => [
    { titulo: 'Asignaturas Enriquecidas', descripcion: 'Más de 500 asignaturas enriquecidas con contenido académico de ASU®' },
    { titulo: 'Profesionales Bilingües', descripcion: 'Formación gratuita en Idioma Inglés que potencia tu perfil profesional.' },
    { titulo: 'Global Signature Courses', descripcion: 'Vive la experiencia global junto a docentes de la red de Universidades potenciadas por Arizona State University.' },
    { titulo: 'Máster Class', descripcion: 'Aprende de expertos internacionales en sesiones exclusivas con enfoque práctico e innovador.' },
    { titulo: 'Maestrías Aceleradas', descripcion: 'Completa tu carrera de pregrado y maestría en menos tiempo con programas integrados UFG + ASU.' }
  ],
  ctaText: 'VER PROGRAMAS 3+1',
  ctaLink: '/oferta-academica'
})

const currentIndex = ref(0)
const slidesPerView = ref(3)

const maxIndex = computed(() => Math.max(0, (props.beneficios?.length ?? 0) - slidesPerView.value))
const translateX = computed(() => {
  const gap = 20
  return `translateX(calc(-${currentIndex.value * (100 / slidesPerView.value)}% - ${currentIndex.value * gap / slidesPerView.value}px))`
})

function prev() { if (currentIndex.value > 0) currentIndex.value-- }
function next() { if (currentIndex.value < maxIndex.value) currentIndex.value++ }

onMounted(() => {
  function update() {
    if (window.innerWidth >= 1280) slidesPerView.value = 3
    else if (window.innerWidth >= 768) slidesPerView.value = 2
    else slidesPerView.value = 1
    currentIndex.value = Math.min(currentIndex.value, maxIndex.value)
  }
  update()
  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))
})
</script>

<template>
  <section class="py-16 xl:py-24 bg-primary overflow-hidden">
    <div class="container mx-auto px-6 text-center">
      <h2 class="heading-2 !text-white reveal">{{ sectionTitle }}</h2>

      <div v-if="logoUrl" class="flex justify-center items-center gap-6 mt-6 reveal delay-100">
        <img :src="logoUrl" class="w-32 h-32 object-contain" alt="UFG y ASU">
      </div>

      <div class="relative max-w-[1200px] mx-auto px-10 xl:px-14 mt-8 reveal delay-200">
        <div class="overflow-hidden w-full">
          <div
            class="flex transition-transform duration-300 ease-in-out gap-5 pt-5"
            :style="{ transform: translateX }"
          >
            <article
              v-for="(beneficio, index) in beneficios"
              :key="index"
              class="shrink-0"
              :style="{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 20 / slidesPerView}px)` }"
            >
              <div class="bg-dark rounded-[40px] overflow-hidden w-full flex flex-col group transition-transform duration-300 hover:-translate-y-2 h-full">
                <div v-if="beneficio.imagen" class="relative h-[200px] xl:h-[250px]">
                  <img :src="beneficio.imagen" :alt="beneficio.titulo" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-primary/40 flex items-center justify-center pt-6 px-6 text-center">
                    <h3 class="font-futura-bold text-white text-2xl uppercase tracking-wider">{{ beneficio.titulo }}</h3>
                  </div>
                </div>
                <div v-else class="relative h-[120px] xl:h-[150px] bg-primary/60 flex items-center justify-center px-6 text-center">
                  <h3 class="font-futura-bold text-white text-2xl uppercase tracking-wider">{{ beneficio.titulo }}</h3>
                </div>
                <div class="p-8 flex-grow flex items-center justify-center">
                  <p class="text-white/80 text-sm xl:text-base leading-relaxed">{{ beneficio.descripcion }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <button
          class="absolute -left-3 xl:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] hover:bg-gray-300 flex items-center justify-center transition-all z-10 disabled:opacity-40"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button
          class="absolute -right-3 xl:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] hover:bg-gray-300 flex items-center justify-center transition-all z-10 disabled:opacity-40"
          :disabled="currentIndex >= maxIndex"
          @click="next"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

      <div class="mt-12 xl:mt-16 reveal delay-400">
        <NuxtLink :to="ctaLink" class="btn-primary btn-lg group relative inline-flex">
          <span>{{ ctaText }}</span>
          <div class="btn-circle"></div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
