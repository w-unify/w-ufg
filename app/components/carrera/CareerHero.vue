<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  image?: string
  modality?: string
  asuEnriched?: boolean
  duration?: string
  degree?: string
  asuLogoImage?: string
}

const props = defineProps<Props>()
</script>

<template>
  <section class="relative pt-24 pb-12 xl:pt-36 xl:pb-20 px-[18px] xl:px-[31px] max-w-[1400px] mx-auto">
    <div class="grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-[auto_auto] gap-8 xl:gap-x-12 xl:gap-y-6 items-start">

      <div class="order-1 xl:col-start-1 xl:row-start-1 flex flex-col gap-6 reveal">
        <h1 class="heading-1 !mb-0">{{ title }}</h1>
        <p class="text-dark text-base xl:text-lg max-w-[600px] !mb-0">{{ description }}</p>
      </div>

      <div class="order-2 xl:order-none xl:col-start-2 xl:row-span-2 w-full reveal delay-200">
        <div v-if="image" class="hero-img-mask">
          <img :src="image" :alt="title" class="w-full h-full object-cover object-top">
          <div class="img-gradient-overlay"></div>
        </div>
        <div v-else class="hero-img-mask flex items-center justify-center bg-muted">
          <p class="text-dark/50 text-center font-futura">Sin imagen asignada</p>
        </div>
      </div>

      <div class="order-3 xl:col-start-1 xl:row-start-2 w-full reveal delay-400">
        <div class="relative max-w-full xl:max-w-[622px]">
          <div class="career-info-card">
            <div class="tag-asu-header">
              <div class="bg-accent text-white px-5 flex items-center font-futura-bold text-[13px] xl:text-base rounded-tag-mixed z-10">
                {{ modality }}
              </div>
              <div v-if="asuEnriched" class="bg-asu text-white flex-1 flex items-center justify-center font-futura-bold text-[11px] xl:text-sm -ml-4 pl-4">
                Enriquecida con contenido ASU
              </div>
            </div>

            <div class="career-info-content">
              <div class="flex items-center justify-center gap-6 xl:gap-10 w-full text-dark font-futura">
                <div class="flex items-center gap-2">
                  <img src="/img/carreras/duracion.svg" alt="Reloj" class="w-5 h-5 xl:w-6 xl:h-6">
                  <span class="text-[13px] xl:text-lg whitespace-nowrap">{{ duration }}</span>
                </div>
                <div v-if="degree" class="flex items-center gap-2">
                  <img src="/img/carreras/titulo.svg" alt="Título" class="w-5 h-5 xl:w-6 xl:h-6">
                  <span class="text-[13px] xl:text-lg whitespace-nowrap">{{ degree }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="asuEnriched" class="asu-floating-logo">
            <img :src="asuLogoImage" alt="ASU Logo" class="w-[70px] h-[70px] xl:w-[87px] xl:h-[87px]">
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
