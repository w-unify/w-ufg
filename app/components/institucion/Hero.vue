<script setup lang="ts">
interface Props {
  bannerFondo?: string
  logo?: string
  mision?: string
  vision?: string
  valoresTitulo?: string
  valores?: string[]
}

withDefaults(defineProps<Props>(), {
  bannerFondo: '',
  logo: '',
  mision: '',
  vision: '',
  valoresTitulo: 'Valores',
  valores: () => [],
})
</script>

<template>
  <section id="institucion" class="relative overflow-hidden bg-primary">

    <div class="relative min-h-[600px] xl:min-h-[700px] flex flex-col items-center pt-16 xl:pt-12 px-6">

      <div class="absolute inset-x-0 top-0 z-0 w-full opacity-50">
        <img
          v-if="bannerFondo"
          :src="bannerFondo"
          class="w-full h-auto object-top"
          alt="Fachada UFG"
        >
      </div>

      <div class="relative z-20 container mx-auto flex flex-col items-center">

        <div class="mb-12 xl:mb-32 xl:mt-16 reveal">
          <img
            v-if="logo"
            :src="logo"
            class="max-w-[300px] xl:max-w-[450px] h-auto"
            alt="UFG Logo Institución"
          >
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 max-w-[1100px] w-full mb-16 xl:mb-24">

          <article class="bg-white rounded-card p-8 xl:p-12 reveal">
            <div class="text-dark/80 text-sm xl:text-base leading-relaxed" v-html="mision"></div>
          </article>

          <article class="bg-white rounded-card p-8 xl:p-12 reveal delay-200">
            <div class="text-dark/80 text-sm xl:text-base leading-relaxed" v-html="vision"></div>
          </article>

        </div>
      </div>
    </div>

    <div class="pb-12 xl:pb-24 px-6 relative z-20">
      <div class="container mx-auto text-center">
        <h2 class="font-futura-bold text-white text-3xl xl:text-5xl mb-12 xl:mb-10 reveal">{{ valoresTitulo }}</h2>

        <div class="flex flex-col xl:flex-row flex-wrap justify-center items-center gap-4 xl:gap-6 max-w-[1200px] mx-auto reveal delay-400">
          <span
            v-for="(valor, i) in valores"
            :key="i"
            class="bg-muted text-dark font-futura-bold px-10 py-4 xl:py-6 rounded-full xl:rounded-card text-lg xl:text-xl w-[280px] xl:w-auto text-center shadow-md"
          >{{ valor }}</span>
        </div>
      </div>
    </div>

  </section>
</template>
