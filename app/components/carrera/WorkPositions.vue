<script setup lang="ts">
interface Props {
  sectionTitle?: string
  positions?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: '¿En qué vas a trabajar?',
  positions: () => []
})

const swiperEl = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const slidesPerView = ref(3)

const totalSlides = computed(() => props.positions?.length ?? 0)
const maxIndex = computed(() => Math.max(0, totalSlides.value - slidesPerView.value))

function prev() {
  currentIndex.value = Math.max(0, currentIndex.value - 1)
}

function next() {
  currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1)
}

const translateX = computed(() => {
  const slideWidth = 100 / slidesPerView.value
  return `translateX(-${currentIndex.value * slideWidth}%)`
})

onMounted(() => {
  const update = () => {
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
  <section class="pt-16 pb-8 xl:pt-32 xl:pb-16">
    <div class="container mx-auto max-w-[1400px] px-6">
      <h2 class="heading-2 text-primary mb-12 reveal">{{ sectionTitle }}</h2>

      <div class="relative px-12 xl:px-[60px] reveal delay-200">
        <!-- Slides -->
        <div class="overflow-hidden w-full" style="padding-right: 2px;">
          <div
            class="flex transition-transform duration-300 ease-in-out gap-5 xl:gap-8 pb-1"
            :style="{ transform: translateX }"
          >
            <article
              v-for="(position, index) in positions"
              :key="index"
              class="shrink-0"
              :style="{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 20 / slidesPerView}px)` }"
            >
              <div class="bg-muted rounded-card p-6 xl:p-5 min-h-32 xl:min-h-32 flex items-center justify-center text-center">
                <h3 class="text-lg xl:text-lg font-futura-bold leading-[1.2]">{{ position }}</h3>
              </div>
            </article>
          </div>
        </div>

        <!-- Botón anterior -->
        <button
          class="absolute -left-2 xl:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
          :disabled="currentIndex === 0"
          aria-label="Anterior"
          @click="prev"
        >
          <svg class="w-4 h-4 rotate-90" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Botón siguiente -->
        <button
          class="absolute -right-2 xl:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
          :disabled="currentIndex >= maxIndex"
          aria-label="Siguiente"
          @click="next"
        >
          <svg class="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
