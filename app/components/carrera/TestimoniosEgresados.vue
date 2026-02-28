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
  <section class="py-16 xl:py-24 bg-white overflow-hidden">
    <div class="container mx-auto max-w-[1200px] px-6">
      <h2 class="heading-2 text-primary text-center mb-8 xl:mb-16 reveal">{{ sectionTitle }}</h2>

      <div class="flex items-center justify-center gap-[10px] xl:gap-[20px]">
        <!-- Botón anterior -->
        <button
          class="shrink-0 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

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
              <div class="bg-dark rounded-card overflow-hidden h-full flex flex-col reveal delay-200">
                <!-- Video embed -->
                <div class="relative w-full aspect-video bg-black">
                  <iframe
                    v-if="item.linkVideo"
                    :src="getYoutubeEmbed(item.linkVideo)"
                    class="absolute top-0 left-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
                <!-- Info egresado -->
                <div class="flex items-center gap-4 p-3 xl:p-4">
                  <div class="w-14 h-14 xl:w-16 xl:h-16 shrink-0">
                    <img
                      v-if="item.fotoEgresado"
                      :src="item.fotoEgresado"
                      :alt="item.nombreEgresado"
                      class="w-full h-full object-cover rounded-full border-2 border-white"
                    >
                  </div>
                  <div>
                    <p class="text-white text-base xl:text-lg leading-tight">{{ item.nombreEgresado }}</p>
                    <span class="text-xs xl:text-sm text-white/70 font-futura">{{ item.profesionEgresado }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Botón siguiente -->
        <button
          class="shrink-0 w-10 h-10 xl:w-12 xl:h-12 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
          :disabled="currentIndex >= maxIndex"
          @click="next"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
