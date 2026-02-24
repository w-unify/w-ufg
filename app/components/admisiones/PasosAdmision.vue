<script setup lang="ts">
interface Paso {
  numero: string
  titulo: string
  descripcion: string
  icono?: string
}

interface Props {
  sectionTitle?: string
  pasos?: Paso[]
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: 'Pasos de Solicitud de Admisión',
  pasos: () => [
    { numero: 'PASO 1', titulo: 'Completa tu inscripción', descripcion: 'Llena el formulario de admisión en línea y obtén tu número de carné UFG al finalizar.' },
    { numero: 'PASO 2', titulo: 'Realiza el pago del curso', descripcion: 'Con tu carné UFG, paga el Curso de Inducción en bancos o plataformas autorizadas.' },
    { numero: 'PASO 3', titulo: 'Inscríbete al curso de inducción', descripcion: 'Sube tus documentos en formato PDF en la plataforma y confirma tu inscripción.' },
    { numero: 'PASO 4', titulo: 'Inscribe tus asignaturas', descripcion: 'Elige tus asignaturas y realiza el pago de inscripción al ciclo actual.' }
  ]
})

const currentIndex = ref(0)
const slidesPerView = ref(4)

const maxIndex = computed(() => Math.max(0, (props.pasos?.length ?? 0) - slidesPerView.value))
const translateX = computed(() => {
  const gap = slidesPerView.value === 1 ? 20 : 20
  return `translateX(calc(-${currentIndex.value * (100 / slidesPerView.value)}% - ${currentIndex.value * gap / slidesPerView.value}px))`
})

function prev() { if (currentIndex.value > 0) currentIndex.value-- }
function next() { if (currentIndex.value < maxIndex.value) currentIndex.value++ }

onMounted(() => {
  function update() {
    if (window.innerWidth >= 1280) slidesPerView.value = 4
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
    <div class="container mx-auto max-w-[1400px] px-6">
      <h2 class="heading-2 !text-white text-center mb-12 xl:mb-16 reveal">
        {{ sectionTitle }}
      </h2>

      <div class="flex items-center justify-center gap-[10px] xl:gap-[20px]">
        <button
          class="shrink-0 w-10 h-10 xl:w-12 xl:h-12 bg-white/20 hover:bg-white/40 rounded-[8px] flex items-center justify-center transition-colors disabled:opacity-30"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="overflow-hidden w-full">
          <div
            class="flex transition-transform duration-300 ease-in-out gap-5"
            :style="{ transform: translateX }"
          >
            <article
              v-for="(paso, index) in pasos"
              :key="index"
              class="shrink-0"
              :style="{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 20 / slidesPerView}px)` }"
            >
              <div class="bg-muted rounded-card p-5 xl:p-6 h-full flex flex-col text-center xl:text-left reveal" :class="`delay-${(index + 1) * 100}`">
                <span class="text-center text-xs xl:text-sm tracking-[0.2em] text-dark/60 uppercase mb-3 block border-b border-dark/10 pb-2">
                  {{ paso.numero }}
                </span>
                <h3 class="text-center font-futura-bold text-dark text-lg xl:text-xl leading-tight mb-3 uppercase border-b border-dark/10 pb-3">
                  {{ paso.titulo }}
                </h3>
                <div class="flex items-start mt-auto min-h-16 xl:min-h-24">
                  <div class="flex items-center gap-3">
                    <img v-if="paso.icono" :src="paso.icono" :alt="paso.titulo" class="w-6 h-6 xl:w-8 xl:h-8 shrink-0">
                    <p class="text-sm xl:text-base text-left leading-[1.3] text-dark">
                      {{ paso.descripcion }}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <button
          class="shrink-0 w-10 h-10 xl:w-12 xl:h-12 bg-white/20 hover:bg-white/40 rounded-[8px] flex items-center justify-center transition-colors disabled:opacity-30"
          :disabled="currentIndex >= maxIndex"
          @click="next"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
