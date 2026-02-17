<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  logosImage?: string
  campusImage?: string
  ctaText?: string
  ctaLink?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Educación De Clase Mundial, Ahora En El Salvador',
  description: 'La UFG y Arizona State University, la # 1 en Innovación por 11 años consecutivos, te conectan con una formación global y beneficios académicos únicos que impulsan tu desarrollo profesional.',
  logosImage: '/img/home/alianza-ufg-asu-logos.webp',
  campusImage: '/img/home/alianza-ufg-asu.webp',
  ctaText: 'VER MÁS',
  ctaLink: '/powered-by-asu'
})
</script>

<template>
  <section class="pt-6 xl:pt-12 bg-white overflow-hidden">
    <div class="container mx-auto max-w-[1400px] px-6">

      <div class="flex flex-col items-center text-center mb-5 xl:mb-8">
        <h2 class="heading-2 !text-primary mb-6 reveal" v-html="title.replace(',', ',<br class=\'hidden xl:block\'>')"></h2>
        <p class="text-sm xl:text-lg text-dark max-w-[850px] mb-5 xl:mb-6">
          {{ description }}
        </p>
        <div class="w-full max-w-[300px] md:max-w-[450px] xl:max-w-[600px]">
          <img :src="logosImage" alt="Alianza UFG y Arizona State University" class="w-full h-auto object-contain">
        </div>
      </div>

      <div class="relative max-w-[850px] mx-auto overflow-hidden shadow-sm reveal delay-200 rounded-t-[25px] xl:rounded-t-[45px]">
        <img :src="campusImage" alt="Campus UFG ASU" class="w-full h-[350px] md:h-[450px] xl:h-[550px] object-cover block">
        <div class="absolute inset-0 flex items-end justify-end p-5 xl:items-center xl:justify-end xl:pr-[80px] xl:p-0">
          <NuxtLink :to="ctaLink" class="btn-white btn-nm group shadow-xl">
            <span>{{ ctaText }}</span>
            <div class="btn-circle"></div>
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>
