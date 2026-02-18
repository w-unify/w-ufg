<script setup lang="ts">
interface Testimonio {
  linkVideo: string
  nombreEgresado: string
  profesionEgresado: string
  fotoEgresado: string
}

interface Props {
  sectionTitle?: string
  items?: Testimonio[]
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: 'Testimonios de egresados',
  items: () => []
})

const currentIndex = ref(0)
const slidesPerView = ref(2)

const maxIndex = computed(() => Math.max(0, (props.items?.length ?? 0) - slidesPerView.value))
const translateX = computed(() => `translateX(calc(-${currentIndex.value * (100 / slidesPerView.value)}% - ${currentIndex.value * (slidesPerView.value === 1 ? 20 : 30) / slidesPerView.value}px))`)

function prev() { if (currentIndex.value > 0) currentIndex.value-- }
function next() { if (currentIndex.value < maxIndex.value) currentIndex.value++ }

function getYoutubeEmbed(url: string): string {
  if (!url) return ''
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

onMounted(() => {
  function update() {
    slidesPerView.value = window.innerWidth >= 1024 ? 2 : 1
    currentIndex.value = Math.min(currentIndex.value, maxIndex.value)
  }
  update()
  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))
})
</script>

<template>
  <section class="pt-8 pb-16 xl:py-24 bg-white">
    <div class="container mx-auto max-w-[1400px] px-6">
      <h2 class="heading-2 text-primary mb-12 reveal">{{ sectionTitle }}</h2>

      <div class="relative px-12 xl:px-[60px] reveal delay-200">
        <!-- Slides -->
        <div class="overflow-hidden w-full">
          <div
            class="flex transition-transform duration-300 ease-in-out gap-5 xl:gap-8"
            :style="{ transform: translateX }"
          >
            <article
              v-for="(item, index) in items"
              :key="index"
              class="shrink-0"
              :style="{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 30 / slidesPerView}px)` }"
            >
              <div class="rounded-card overflow-hidden bg-dark">
                <!-- Video embed -->
                <div class="relative aspect-video bg-black">
                  <iframe
                    v-if="item.linkVideo"
                    :src="getYoutubeEmbed(item.linkVideo)"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <!-- Info egresado -->
                <div class="flex items-center gap-3 p-4">
                  <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-muted">
                    <img
                      v-if="item.fotoEgresado"
                      :src="item.fotoEgresado"
                      :alt="item.nombreEgresado"
                      class="w-full h-full object-cover"
                    >
                  </div>
                  <div>
                    <p class="font-futura-bold text-white text-sm leading-tight">{{ item.nombreEgresado }}</p>
                    <p class="font-futura text-white/70 text-xs">{{ item.profesionEgresado }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Botón anterior -->
        <button
          class="absolute -left-2 xl:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <!-- Botón siguiente -->
        <button
          class="absolute -right-2 xl:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
          :disabled="currentIndex >= maxIndex"
          @click="next"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
