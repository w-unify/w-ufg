<script setup lang="ts">
interface ColaboradorItem {
  parrafo: string
}

interface Props {
  titulo?: string
  fondo?: string
  items?: ColaboradorItem[]
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Beneficios para Colaboradores',
  fondo: '',
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
  <section class="relative py-16 xl:py-24 bg-muted overflow-hidden">

    <!-- Fondo imagen con overlay -->
    <div class="absolute inset-0 z-0">
      <img
        v-if="fondo"
        :src="fondo"
        class="w-full h-full object-cover object-center"
        alt=""
      >
      <div class="absolute inset-0 bg-black/70"></div>
    </div>

    <div class="relative z-10 container mx-auto max-w-[1400px] px-6">

      <h2 class="heading-2 !text-white text-center mb-12 xl:mb-16 reveal">{{ titulo }}</h2>

      <div class="flex items-center justify-center gap-[10px] xl:gap-[20px]">

        <!-- Prev -->
        <button
          class="shrink-0 w-10 h-10 xl:w-12 xl:h-12 bg-white/20 hover:bg-white/40 rounded-[8px] flex items-center justify-center transition-colors"
          :disabled="current === 0"
          @click="prev"
        >
          <svg class="w-4 h-4 text-white rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Slider -->
        <div class="overflow-hidden w-full">
          <div
            class="flex transition-transform duration-500 ease-in-out gap-4"
            :style="{ transform: `translateX(${translateX})` }"
          >
            <article
              v-for="(item, i) in items"
              :key="i"
              class="h-auto shrink-0"
              :style="{ width: `calc(${100 / visibleCount}% - 12px)` }"
            >
              <div class="bg-muted rounded-card p-5 xl:p-6 h-full flex flex-col reveal delay-100">
                <div v-html="item.parrafo"></div>
              </div>
            </article>
          </div>
        </div>

        <!-- Next -->
        <button
          class="shrink-0 w-10 h-10 xl:w-12 xl:h-12 bg-white/20 hover:bg-white/40 rounded-[8px] flex items-center justify-center transition-colors"
          :disabled="current >= maxIndex"
          @click="next"
        >
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  </section>
</template>
