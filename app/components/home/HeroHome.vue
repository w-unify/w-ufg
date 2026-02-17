<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  imageDesktop?: string
  imageMobile?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ciclo 02-2026',
  subtitle: 'Se parte de la UFG, potenciada por Arizona State University (ASU®)',
  ctaText: 'OFERTA ACADÉMICA',
  ctaLink: '/oferta-academica',
  imageDesktop: '/img/home/ufg-ciclo-01-desktop.webp',
  imageMobile: '/img/home/ufg-ciclo-01-mobile.webp'
})
</script>

<template>
  <section class="hero-section">
    <picture class="absolute inset-0 w-full h-full">
      <source media="(min-width: 1024px)" :srcset="imageDesktop">
      <img :src="imageMobile" :alt="title" class="w-full h-full object-cover">
    </picture>

    <div class="hero-overlay-mobile"></div>
    <div class="hero-overlay-desktop"></div>

    <div class="relative z-10 h-full w-full max-w-[1400px] mx-auto px-[18px] xl:px-[31px] flex flex-col justify-end pb-12 xl:justify-center xl:pb-0">
      <div class="max-w-[342px] xl:max-w-[859px]">
        <h2 class="hero-title text-4xl md:text-5xl 2xl:text-6xl fade-left">{{ title }}</h2>
        <p class="hero-subtitle text-base 2xl:text-xl fade delay-400">{{ subtitle }}</p>
        <div class="fade delay-600">
          <NuxtLink :to="ctaLink" class="btn-primary btn-sm xl:btn-lg group mt-6 xl:mt-[30px]">
            <span>{{ ctaText }}</span>
            <div class="btn-circle"></div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
