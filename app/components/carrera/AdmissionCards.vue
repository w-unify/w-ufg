<script setup lang="ts">
interface AdmissionCard {
  title: string
  ctaText: string
  ctaLink: string
  isPulse?: boolean
}

interface Props {
  sectionTitle?: string
  cards?: AdmissionCard[]
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Admisiones',
  cards: () => [
    { title: 'Conoce los requisitos y pasos de Admisión', ctaText: 'REQUISITOS', ctaLink: '/admisiones', isPulse: false },
    { title: 'Educación Local, con Impacto Global ¡Inscríbete!', ctaText: 'APLICAR', ctaLink: '/aplicar', isPulse: true }
  ]
})
</script>

<template>
  <section class="bg-muted py-16 xl:py-24 px-6 xl:px-[31px]">
    <div class="max-w-[1400px] mx-auto">
      <h2 class="heading-2 !text-primary mb-10 xl:mb-16 fade delay-200">{{ sectionTitle }}</h2>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
        <article
          v-for="(card, index) in cards"
          :key="index"
          class="access-card flex-col xl:flex-row text-center xl:text-left gap-6 xl:gap-0"
        >
          <h3 class="text-xl xl:text-2xl font-futura-bold w-full xl:w-2/3">{{ card.title }}</h3>
          <div class="w-full xl:w-1/3 flex justify-center xl:justify-end" :class="card.isPulse ? 'pulse delay-400' : 'fade'">
            <NuxtLink :to="card.ctaLink" class="btn-primary btn-nm xl:btn-nm group">
              <span>{{ card.ctaText }}</span>
              <div class="btn-circle"></div>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
