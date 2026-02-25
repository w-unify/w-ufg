<script setup lang="ts">
interface BeneficioItem {
  titulo: string
  texto: string
  imagen?: string
}

interface Props {
  titulo?: string
  bannerImg?: string
  items?: BeneficioItem[]
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Beneficios UFG+ASU',
  bannerImg: '',
  items: () => [],
})

const currentIndex = ref(0)
const slidesPerView = ref(3)

const maxIndex = computed(() => Math.max(0, (props.items?.length ?? 0) - slidesPerView.value))
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
  <section id="beneficios-alianza" class="relative pb-16 pt-32 xl:pb-24 xl:pt-40 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        v-if="bannerImg"
        :src="bannerImg"
        class="w-full h-full object-cover"
        alt="Fondo Beneficios"
      >
      <div v-else class="w-full h-full bg-primary"></div>
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <div class="container relative z-10 mx-auto px-6 text-center">
      <h2 class="heading-2 text-white! reveal">{{ titulo }}</h2>

      <div class="relative max-w-[1200px] mx-auto px-10 xl:px-14 mt-8">
        <div class="overflow-hidden w-full">
          <div
            class="flex transition-transform duration-300 ease-in-out gap-5 pt-5"
            :style="{ transform: translateX }"
          >
            <article
              v-for="(item, index) in items"
              :key="index"
              class="shrink-0"
              :style="{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 20 / slidesPerView}px)` }"
            >
              <div class="bg-white rounded-[40px] overflow-hidden w-full flex flex-col group transition-transform duration-300 hover:-translate-y-2 h-full">
                <div class="relative h-[200px] xl:h-[250px]">
                  <img
                    v-if="item.imagen"
                    :src="item.imagen"
                    :alt="item.titulo"
                    class="w-full h-full object-cover"
                  >
                  <div v-else class="w-full h-full bg-primary/20"></div>
                  <div class="absolute inset-0 bg-primary/40 flex items-center justify-center pt-6 px-6 text-center">
                    <h3 class="font-futura-bold text-white text-2xl uppercase tracking-wider">{{ item.titulo }}</h3>
                  </div>
                </div>
                <div class="p-8 grow flex items-center justify-center">
                  <p class="text-sm xl:text-base leading-relaxed text-dark/80">{{ item.texto }}</p>
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
    </div>
  </section>
</template>
