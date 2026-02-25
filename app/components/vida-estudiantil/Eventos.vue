<script setup lang="ts">
interface EventoItem {
  imagen: string
  titulo: string
  descripcion: string
  fecha: string
  dia: string
  mes: string
  modalidad: string
}

interface Props {
  titulo?: string
  items?: EventoItem[]
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Eventos',
  items: () => [],
})

const current = ref(0)
const visibleCount = ref(1)

onMounted(() => {
  updateVisible()
  window.addEventListener('resize', updateVisible)
})
onUnmounted(() => window.removeEventListener('resize', updateVisible))

function updateVisible() {
  visibleCount.value = window.innerWidth >= 1280 ? 2 : 1
}

const maxIndex = computed(() => Math.max(0, props.items.length - visibleCount.value))
const translateX = computed(() => `-${(100 / visibleCount.value) * current.value}%`)

const prev = () => { current.value = Math.max(0, current.value - 1) }
const next = () => { current.value = Math.min(maxIndex.value, current.value + 1) }

</script>

<template>
  <section id="eventos" class="py-16 xl:py-24 bg-primary overflow-hidden">
    <div class="container mx-auto px-10">
      <h2 class="heading-2 text-white! text-center mb-12 xl:mb-16 reveal">{{ titulo }}</h2>

      <div class="relative max-w-[1200px] mx-auto">

        <!-- Slider track -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out gap-4 xl:gap-6"
            :style="{ transform: `translateX(${translateX})` }"
          >
            <article
              v-for="(item, i) in items"
              :key="i"
              class="shrink-0 h-auto"
              :style="{ width: `calc(${100 / visibleCount}% - 16px)` }"
            >
              <div class="bg-white rounded-listing-card overflow-hidden h-full flex flex-col">
                <!-- Imagen -->
                <div class="relative w-full aspect-video overflow-hidden p-5">
                  <img
                    :src="item.imagen || '/img/empty-image.webp'"
                    class="w-full h-full object-cover rounded-listing-img"
                    alt=""
                  >
                </div>
                <!-- Título -->
                <div class="bg-gray-100 px-6 py-4 mb-4">
                  <h3 class="font-futura-bold text-dark text-lg xl:text-xl leading-tight">
                    {{ item.titulo }}
                  </h3>
                </div>
                <!-- Cuerpo -->
                <div class="flex flex-row gap-4 px-6 mb-6 grow">
                  <div class="w-2/3 flex flex-col justify-between">
                    <p class="text-base text-dark leading-snug line-clamp-4 mb-4">{{ item.descripcion }}</p>
                    <div class="space-y-2">
                      <div v-if="item.fecha" class="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-[12px] text-dark">
                        <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>{{ item.fecha }}</span>
                      </div>
                      <br>
                      <div v-if="item.modalidad" class="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-[11px] font-bold text-dark">
                        <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>{{ item.modalidad }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="w-1/3 flex flex-col gap-3">
                    <div class="bg-muted rounded-[20px] p-4 flex flex-col items-center justify-center text-center border-t-[8px] border-secondary">
                      <span class="block text-4xl xl:text-5xl font-black text-dark leading-none">
                        {{ item.dia }}
                      </span>
                      <span class="block text-sm xl:text-base font-futura-bold text-dark uppercase tracking-wide">
                        {{ item.mes }}
                      </span>
                    </div>
                    <a href="#" class="btn-secondary group btn-sm xl:btn-nm w-full">
                      <span>ASISTIR</span>
                      <div class="btn-circle"></div>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Prev -->
        <button
          class="absolute -left-4 xl:-left-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors"
          :disabled="current === 0"
          @click="prev"
        >
          <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Next -->
        <button
          class="absolute -right-4 xl:-right-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center hover:bg-gray-300 transition-colors"
          :disabled="current >= maxIndex"
          @click="next"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

      </div>
    </div>
  </section>
</template>
