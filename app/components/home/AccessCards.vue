<script setup lang="ts">
interface AccessCard {
  title: string
  ctaText: string
  ctaLink: string
}

interface Props {
  sectionTitle?: string
  cards?: AccessCard[]
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Nuestra Propuesta',
  cards: () => [
    { title: 'Carreras', ctaText: 'VER MÁS', ctaLink: '/oferta-academica' },
    { title: 'Proceso de Inscripción', ctaText: 'VER MÁS', ctaLink: '/admisiones' }
  ]
})
</script>

<template>
  <section class="bg-muted py-16 xl:py-24 px-[18px] xl:px-[31px]">
    <div class="max-w-[1400px] mx-auto">
      <h2 class="heading-2 text-primary mb-10 xl:mb-16 reveal">{{ sectionTitle }}</h2>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
        <article v-for="(card, index) in cards" :key="index" class="access-card fade">
          <h3 class="heading-3 w-1/2 text-left">{{ card.title }}</h3>
          <div class="w-1/2 flex justify-end">
            <NuxtLink :to="card.ctaLink" class="btn-secondary btn-sm xl:btn-nm group">
              <span>{{ card.ctaText }}</span>
              <div class="btn-circle"></div>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
