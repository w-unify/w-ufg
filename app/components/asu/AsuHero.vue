<script setup lang="ts">
interface Props {
  bannerImg?: string
  logoImg?: string
  miniBannerImg?: string
}

withDefaults(defineProps<Props>(), {
  bannerImg: '',
  logoImg: '',
  miniBannerImg: '',
})
</script>

<template>
  <section class="relative min-h-[350px] xl:min-h-[400px] pt-[30px] xl:pt-[40px] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        v-if="bannerImg"
        :src="bannerImg"
        alt="Fondo ASU"
        class="w-full h-full object-cover"
      >
      <div v-else class="w-full h-full bg-primary"></div>
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <div class="container relative z-10 mx-auto px-6 py-20 flex flex-col items-center text-center">
      <div class="mb-8 xl:mb-12 fade">
        <img
          v-if="logoImg"
          :src="logoImg"
          alt="Logos UFG ASU"
          class="w-full max-w-[320px] xl:max-w-[850px] h-auto mx-auto"
        >
      </div>

      <div v-if="miniBannerImg" class="fade delay-300">
        <img
          :src="miniBannerImg"
          alt="Educación de Clase Mundial"
          class="w-full max-w-[300px] xl:max-w-[500px] h-auto shadow-lg rounded-full"
        >
      </div>
    </div>
  </section>
</template>
