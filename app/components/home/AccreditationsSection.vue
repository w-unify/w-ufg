<script setup lang="ts">
interface Accreditation {
  image: string
  name: string
}

interface Props {
  title?: string
  items?: Accreditation[]
}

withDefaults(defineProps<Props>(), {
  title: 'Acreditaciones',
  items: () => [
    { image: '/img/home/acreditaciones-cda.webp', name: 'CdA' },
    { image: '/img/home/acreditaciones-hceres.webp', name: 'HCÉRES' },
    { image: '/img/home/acreditaciones-qs.webp', name: 'QS Stars University Ratings' }
  ]
})
</script>

<template>
  <section class="bg-muted py-16 xl:py-24 px-[18px] xl:px-[31px]">
    <div class="container mx-auto max-w-[1400px]">
      <h2 class="heading-2 text-primary text-center mb-10 xl:mb-16 reveal">
        {{ title }}
      </h2>

      <div class="flex flex-nowrap xl:flex-wrap justify-center items-start xl:items-center gap-0 md:gap-8 xl:gap-12">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex flex-col items-center text-center w-auto min-w-[80px] fade delay-400"
        >
          <div class="h-[100px] md:h-[120px] xl:h-[250px] flex items-center justify-center mb-2">
            <img :src="item.image" :alt="item.name" class="h-full w-auto object-contain">
          </div>
          <p class="font-futura-bold text-xs md:text-sm xl:text-lg text-dark tracking-wider leading-tight max-w-[80px] md:max-w-none">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
