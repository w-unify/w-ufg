<script setup lang="ts">
interface AccordionItem {
  title: string
  content: string
  image?: string
  ctaText?: string
  ctaLink?: string
}

interface Props {
  sectionTitle?: string
  items?: AccordionItem[]
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Becas y financiación',
  items: () => [
    { title: 'Estudiantes UFG', content: 'Información para estudiantes actuales de la Universidad Francisco Gavidia que desean aplicar a programas de becas internas o financiamiento educativo.' },
    { title: 'Tipos de Beca', content: 'Explora las diferentes modalidades de apoyo: Becas a la Excelencia, Becas por Escasos Recursos y convenios institucionales vigentes.' },
    { title: 'Estudiantes de Nuevo Ingreso', content: 'Certificados emitidos por el MINEDUCYT que evidencien tus notas superiores a 8.0 de todo el Bachillerato...', image: '/img/carreras/ejemplo-content-img.webp', ctaText: 'CONOCER MÁS SOBRE FINANCIAMIENTO', ctaLink: '/financiamiento' }
  ]
})

const activeIndex = ref(0)

function toggleItem(index: number) {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<template>
  <section class="bg-muted py-16 xl:py-24 px-6 xl:px-0">
    <div class="container mx-auto max-w-[1400px]">
      <h2 class="heading-2 !text-primary mb-10 xl:mb-16 reveal">{{ sectionTitle }}</h2>

      <div class="max-w-[850px] mx-auto border border-accent rounded-card overflow-hidden reveal delay-200">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="accordion-item border-b border-accent last:border-b-0"
          :class="{ active: activeIndex === index }"
        >
          <button
            class="accordion-header w-full flex justify-between items-center px-6 py-4 xl:px-10 xl:py-6 transition-all duration-300"
            :class="activeIndex === index ? 'bg-white' : 'bg-muted'"
            @click="toggleItem(index)"
          >
            <h3
              class="font-futura-bold text-lg xl:text-xl transition-all"
              :class="activeIndex === index ? 'text-primary' : 'text-dark'"
            >
              {{ item.title }}
            </h3>
            <span
              class="text-3xl font-light transition-transform duration-300"
              :class="activeIndex === index ? 'text-primary' : 'text-dark'"
            >
              {{ activeIndex === index ? '—' : '+' }}
            </span>
          </button>
          <div
            class="overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white"
            :style="{ maxHeight: activeIndex === index ? '1000px' : '0px' }"
          >
            <div class="px-6 pb-8 xl:px-10 xl:pb-12 text-left">
              <p class="text-sm xl:text-base leading-relaxed text-dark" :class="{ 'mb-8': item.image }">
                {{ item.content }}
              </p>
              <div v-if="item.image" class="flex justify-center mb-10">
                <div class="rounded-content overflow-hidden max-w-[500px]">
                  <img :src="item.image" alt="Financiación" class="w-full h-auto">
                </div>
              </div>
              <div v-if="item.ctaText" class="flex justify-center">
                <NuxtLink :to="item.ctaLink || '#'" class="btn-secondary btn-nm xl:btn-lg group">
                  <span>{{ item.ctaText }}</span>
                  <div class="btn-circle"></div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
