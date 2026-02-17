<script setup lang="ts">
interface Props {
  ufgTitle?: string
  ufgDegree?: string
  asuLabel?: string
  asuDegree?: string
  programImage?: string
}

withDefaults(defineProps<Props>(), {
  ufgTitle: 'Titulo UFG:',
  ufgDegree: 'Ingeniería en Ciencia de Datos',
  asuLabel: 'Doble Titulación ASU:',
  asuDegree: 'Bachelor in Data Sciences (ASU)',
  programImage: '/img/carreras/programa-3-mas-1.webp'
})
</script>

<template>
  <section class="bg-white xl:bg-accent pt-12 pb-5 xl:pt-5 xl:pb-5 px-4 md:px-10 xl:px-0 overflow-hidden">
    <div class="bg-accent xl:bg-transparent container mx-auto max-w-[1400px] xl:rounded-none">
      <div class="flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-20 px-6 xl:px-8 py-8 xl:pt-0 xl:pb-5">

        <div class="w-full xl:w-9/12 text-center xl:text-left text-white order-1 fade">
          <div class="mb-8">
            <p class="font-futura text-[18px] md:text-[20px] opacity-90">{{ ufgTitle }}</p>
            <h3 class="font-futura-bold text-[18px] md:text-[20px] leading-tight mb-5">{{ ufgDegree }}</h3>
          </div>
          <div>
            <p class="font-futura text-[18px] md:text-[20px] opacity-90">{{ asuLabel }}</p>
            <h3 class="font-futura-bold text-[18px] md:text-[20px] leading-tight">{{ asuDegree }}</h3>
          </div>
        </div>

        <div class="w-full xl:w-3/12 flex justify-center xl:justify-end order-2">
          <div class="max-w-[180px] md:max-w-[220px] xl:max-w-[300px] fade-left delay-400">
            <img :src="programImage" alt="Programa 3+1 UFG ASU" class="w-full h-auto object-contain">
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
