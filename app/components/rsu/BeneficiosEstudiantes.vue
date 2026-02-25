<script setup lang="ts">
interface BeneficioItem {
  imagenCircular: string
  parrafo: string
}

interface Props {
  titulo?: string
  items?: BeneficioItem[]
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Beneficios de Estudiantes UFG',
  items: () => [],
})

const current = ref(0)
const visibleCount = ref(1)

onMounted(() => {
  updateVisible()
  window.addEventListener('resize', updateVisible)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisible)
})

function updateVisible() {
  visibleCount.value = window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1
}

const maxIndex = computed(() => Math.max(0, props.items.length - visibleCount.value))

const prev = () => { current.value = Math.max(0, current.value - 1) }
const next = () => { current.value = Math.min(maxIndex.value, current.value + 1) }

const translateX = computed(() => {
  const pct = (100 / visibleCount.value) * current.value
  return `-${pct}%`
})
</script>

<template>
  <section id="beneficios" class="pt-8 pb-16 xl:py-24 bg-white overflow-hidden">
    <div class="container mx-auto px-6 max-w-[1000px]">
      <h2 class="heading-2 text-primary text-center mb-12 reveal">{{ titulo }}</h2>

      <div class="relative px-12 xl:px-0 reveal">

        <!-- Slider -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out gap-4 xl:gap-6"
            :style="{ transform: `translateX(${translateX})` }"
          >
            <article
              v-for="(item, i) in items"
              :key="i"
              class="flex flex-col items-center mb-[80px] xl:mb-[100px] shrink-0"
              :style="{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * (visibleCount === 3 ? 24 : visibleCount === 2 ? 16 : 0) / visibleCount}px)` }"
            >
              <!-- Imagen circular sobresaliente -->
              <div class="w-[120px] h-[120px] xl:w-[150px] xl:h-[150px] rounded-full overflow-hidden mx-auto mb-[-60px] xl:mb-[-75px] relative z-10 shrink-0">
                <img
                  v-if="item.imagenCircular"
                  :src="item.imagenCircular"
                  class="w-full h-full object-cover"
                  alt=""
                >
                <div v-else class="w-full h-full bg-primary/20 rounded-full"></div>
              </div>
              <!-- Card body -->
              <div class="bg-muted rounded-card pt-[80px] xl:pt-[95px] p-6 xl:p-8 text-center flex flex-col items-center w-full shadow-sm min-h-[400px] xl:min-h-[450px]">
                <div v-html="item.parrafo"></div>
              </div>
            </article>
          </div>
        </div>

        <!-- Prev -->
        <button
          class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center xl:-left-16 transition-colors hover:bg-primary/20"
          :disabled="items.length <= 1"
          @click="prev"
        >
          <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Next -->
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#E5E5E5] rounded-[8px] flex items-center justify-center xl:-right-16 transition-colors hover:bg-primary/20"
          :disabled="items.length <= 1"
          @click="next"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Dots -->
        <div v-if="items.length > 1" class="flex justify-center gap-2 mt-4">
          <button
            v-for="(_, i) in items"
            :key="i"
            class="w-2 h-2 rounded-full transition-colors"
            :class="current === i ? 'bg-primary' : 'bg-primary/30'"
            @click="current = i"
          ></button>
        </div>

      </div>
    </div>
  </section>
</template>
