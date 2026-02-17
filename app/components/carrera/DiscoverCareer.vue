<script setup lang="ts">
interface Props {
  title?: string
  aboutText?: string
  learnTitle?: string
  learnText?: string
  learnImage?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Descubre tu carrera',
  aboutText: 'La carrera de Arquitectura te prepara para diseñar, planificar y supervisar proyectos arquitectónicos y urbanos con criterios técnicos, creativos y sostenibles que respondan a las necesidades actuales y futuras.',
  learnTitle: '¿Qué vas a aprender?',
  learnText: 'Domina el diseño arquitectónico, dibujo técnico y digital, urbanismo, normativa constructiva, planificación de proyectos, supervisión de obras y soluciones integrales para el entorno construido. Desarrollarás creatividad, criterio técnico y visión sostenible.',
  learnImage: '/img/infocarreras/Que vas aprender_ - Arquitectura.webp'
})

const accordionItems = ref([false, false])

function toggleAccordion(index: number) {
  accordionItems.value[index] = !accordionItems.value[index]
}
</script>

<template>
  <section class="pt-12 pb-12 xl:py-18 bg-white xl:bg-muted">
    <div class="container mx-auto max-w-[1200px] px-6">
      <h2 class="heading-2 text-primary text-center mb-8 reveal">{{ title }}</h2>

      <!-- Desktop -->
      <div class="hidden xl:block">
        <div class="flex flex-col gap-12">
          <div class="max-w-[900px] mx-auto text-center space-y-6">
            <p class="text-lg leading-relaxed text-dark">{{ aboutText }}</p>
          </div>
          <div class="bg-white rounded-big flex items-center gap-16">
            <div class="w-1/2">
              <img :src="learnImage" :alt="learnTitle" class="w-full h-auto rounded-general object-cover">
            </div>
            <div class="w-1/2 fade delay-200">
              <h3 class="font-futura-bold text-[32px] text-dark mb-6">{{ learnTitle }}</h3>
              <p class="text-base leading-relaxed text-dark">{{ learnText }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Accordion -->
      <div class="xl:hidden">
        <div class="border border-accent rounded-card overflow-hidden reveal delay-200">
          <div class="accordion-item border-b border-accent" :class="{ active: accordionItems[0] }">
            <button class="accordion-header w-full flex justify-between items-center px-6 py-5 bg-white transition-all" @click="toggleAccordion(0)">
              <h3 class="text-primary font-futura-bold text-lg leading-tight text-left pr-4">¿De qué se trata esta carrera?</h3>
              <span class="icon text-primary text-3xl font-light">{{ accordionItems[0] ? '—' : '+' }}</span>
            </button>
            <div class="overflow-hidden transition-all duration-500 bg-white" :class="accordionItems[0] ? 'max-h-[500px]' : 'max-h-0'">
              <div class="px-6 pb-8 space-y-4">
                <p class="text-sm leading-relaxed text-dark">{{ aboutText }}</p>
              </div>
            </div>
          </div>

          <div class="accordion-item" :class="{ active: accordionItems[1] }">
            <button class="accordion-header w-full flex justify-between items-center px-6 py-5 bg-white transition-all" @click="toggleAccordion(1)">
              <h3 class="text-primary font-futura-bold text-lg leading-tight text-left pr-4">{{ learnTitle }}</h3>
              <span class="icon text-primary text-3xl font-light">{{ accordionItems[1] ? '—' : '+' }}</span>
            </button>
            <div class="overflow-hidden transition-all duration-500 bg-white" :class="accordionItems[1] ? 'max-h-[800px]' : 'max-h-0'">
              <div class="px-6 pb-8 text-center">
                <img :src="learnImage" alt="Aprendizaje" class="w-full h-auto rounded-general mb-6">
                <p class="text-sm leading-relaxed text-dark text-left">{{ learnText }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
