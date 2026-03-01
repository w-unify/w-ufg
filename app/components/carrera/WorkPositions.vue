<script setup lang="ts">
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'

interface Props {
  sectionTitle?: string
  positions?: string[]
}

withDefaults(defineProps<Props>(), {
  sectionTitle: '¿En qué vas a trabajar?',
  positions: () => []
})

const swiperRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!swiperRef.value) return
  new Swiper(swiperRef.value, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.work-swiper-next',
      prevEl: '.work-swiper-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1280: { slidesPerView: 3, spaceBetween: 30 },
    },
  })
})
</script>

<template>
  <section class="pt-16 pb-8 xl:pt-32 xl:pb-16">
    <div class="container mx-auto max-w-[1400px] px-6">
      <h2 class="heading-2 text-primary mb-12 reveal">{{ sectionTitle }}</h2>

      <div class="relative px-10 xl:px-14 reveal delay-200">
        <!-- Swiper -->
        <div ref="swiperRef" class="swiper !overflow-hidden w-full">
          <div class="swiper-wrapper">
            <article
              v-for="(position, index) in positions"
              :key="index"
              class="swiper-slide h-auto"
            >
              <div class="bg-muted rounded-card p-6 xl:p-5 min-h-32 xl:min-h-32 flex items-center justify-center text-center">
                <h3 class="text-lg xl:text-lg font-futura-bold leading-[1.2]">{{ position }}</h3>
              </div>
            </article>
          </div>
        </div>

        <!-- Botón anterior -->
        <button
          class="work-swiper-prev absolute -left-2 xl:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors"
          aria-label="Anterior"
        >
          <span class="icon-arrow rotate-90 !bg-dark"></span>
        </button>

        <!-- Botón siguiente -->
        <button
          class="work-swiper-next absolute -right-2 xl:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors"
          aria-label="Siguiente"
        >
          <span class="icon-arrow -rotate-90 !bg-dark"></span>
        </button>
      </div>
    </div>
  </section>
</template>
