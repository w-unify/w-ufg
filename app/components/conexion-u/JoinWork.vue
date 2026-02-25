<script setup lang="ts">
interface Props {
  imagenIzq?: string
  parrafo?: string
}

withDefaults(defineProps<Props>(), {
  imagenIzq: '',
  parrafo: '',
})
</script>

<template>
  <section class="relative py-12 xl:pt-40 xl:pb-12 overflow-hidden">
    <div class="container mx-auto max-w-[1400px] px-6 relative">

      <div class="absolute top-0 left-0 right-0 h-[55%]
                  xl:top-[-80px] xl:bottom-0 xl:h-auto xl:left-[35%] xl:right-[-50vw] xl:w-[150vw]
                  z-0 px-[25px] reveal">
        <div class="w-full h-full bg-muted rounded-card xl:rounded-none xl:rounded-tl-4xl"></div>
      </div>

      <div class="relative z-10 flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-20">

        <div class="w-full xl:w-1/2 order-2 xl:order-1 fade-left">
          <img
            v-if="imagenIzq"
            :src="imagenIzq"
            alt="Sistema de Pasantía y Empleo JoinWork"
            class="w-full h-auto object-cover rounded-general block"
          >
          <div v-else class="w-full aspect-4/3 bg-primary/10 rounded-general"></div>
        </div>

        <div class="w-full xl:w-1/2 order-1 xl:order-2 text-center xl:text-left px-[20px] xl:px-0 pt-[50px]">
          <div
            class="text-base xl:text-lg leading-relaxed text-dark max-w-[550px] mx-auto xl:mx-0 reveal delay-200"
            v-html="parrafo"
          ></div>
        </div>

      </div>
    </div>
  </section>
</template>
