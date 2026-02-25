<script setup lang="ts">
interface VideoItem {
  titulo: string
  videoUrl: string
  nombrePersona: string
  profesionPersona: string
}

interface Props {
  items?: VideoItem[]
  bgImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  bgImage: '',
})

const currentIndex = ref(0)
const slidesPerView = ref(2)

const maxIndex = computed(() => Math.max(0, (props.items?.length ?? 0) - slidesPerView.value))

function prev() {
  currentIndex.value = Math.max(0, currentIndex.value - 1)
}

function next() {
  currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1)
}

function embedUrl(url: string): string {
  if (!url) return ''
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (match) return `https://www.youtube.com/embed/${match[1]}`
  return url.trim()
}

onMounted(() => {
  function update() {
    slidesPerView.value = window.innerWidth >= 768 ? 2 : 1
    currentIndex.value = Math.min(currentIndex.value, maxIndex.value)
  }
  update()
  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))
})
</script>

<template>
  <section class="relative py-16 xl:py-20 overflow-hidden">

    <div class="absolute inset-0 z-0">
      <img
        v-if="bgImage"
        :src="bgImage"
        class="w-full h-full object-cover object-center"
        alt="Fondo Stories UFG"
      >
      <div v-else class="w-full h-full bg-dark"></div>
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <div class="container relative z-10 mx-auto max-w-[1200px] px-6">

      <h2 class="heading-2 text-white! text-center mb-8 xl:mb-16 fade">
        Stories UFG
      </h2>

      <div class="relative max-w-[1000px] mx-auto px-10 xl:px-16">

        <!-- Slider -->
        <div class="overflow-hidden">
          <div
            class="flex gap-5 transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(calc(-${currentIndex * (100 / slidesPerView)}% - ${currentIndex * (20 / slidesPerView)}px))` }"
          >
            <article
              v-for="(item, i) in items"
              :key="i"
              class="shrink-0"
              :style="{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 20 / slidesPerView}px)` }"
            >
              <div class="bg-muted rounded-card p-3 xl:p-4 h-full flex flex-col">
                <div class="relative w-full aspect-video rounded-content overflow-hidden mb-4 xl:mb-5 bg-black">
                  <iframe
                    class="absolute top-0 left-0 w-full h-full"
                    :src="embedUrl(item.videoUrl)"
                    :title="item.nombrePersona"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="flex items-center gap-4">
                  <div>
                    <p class="text-dark text-base xl:text-lg leading-tight font-futura-bold">{{ item.nombrePersona }}</p>
                    <span class="text-xs xl:text-sm text-dark/70">{{ item.profesionPersona }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Prev -->
        <button
          class="absolute -left-4 xl:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-all shadow-lg disabled:opacity-40"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          <svg class="w-5 h-5 text-dark rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Next -->
        <button
          class="absolute -right-4 xl:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-all shadow-lg disabled:opacity-40"
          :disabled="currentIndex >= maxIndex"
          @click="next"
        >
          <svg class="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  </section>
</template>
