<script setup lang="ts">
interface Boton {
  texto: string
  icono?: string
  enlace: string
}

interface Props {
  titulo?: string
  imagenIzq?: string
  parrafo?: string
  btn1?: Boton | null
  btn2?: Boton | null
}

withDefaults(defineProps<Props>(), {
  titulo: 'Beneficios y Descuentos',
  imagenIzq: '',
  parrafo: '',
  btn1: null,
  btn2: null,
})
</script>

<template>
  <div>
    <section id="beneficios" class="relative pt-16 xl:pt-24 pb-0 xl:pb-2">
      <div class="container mx-auto max-w-[1400px] px-5">
        <h2 class="heading-2 text-primary">{{ titulo }}</h2>
      </div>
    </section>

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
              :alt="titulo"
              class="w-full h-auto object-cover rounded-general block"
            >
            <div v-else class="w-full aspect-4/3 bg-primary/10 rounded-general"></div>
          </div>

          <div class="w-full xl:w-1/2 order-1 xl:order-2 text-center xl:text-left px-[20px] xl:px-0 pt-[50px]">
            <div
              class="text-base xl:text-lg leading-relaxed text-dark max-w-[550px] mx-auto xl:mx-0 reveal delay-200"
              v-html="parrafo"
            ></div>

            <div
              v-if="btn1 || btn2"
              class="flex flex-row flex-wrap items-center justify-center xl:items-start xl:justify-start gap-3 xl:gap-4 pt-5 fade delay-300"
            >
              <a
                v-if="btn1"
                :href="btn1.enlace"
                target="_blank"
                rel="noopener"
                class="btn-secondary btn-sm w-auto group inline-flex"
              >
                <span>{{ btn1.texto }}</span>
                <div class="btn-circle"></div>
              </a>
              <a
                v-if="btn2"
                :href="btn2.enlace"
                target="_blank"
                rel="noopener"
                class="btn-secondary btn-sm w-auto group inline-flex"
              >
                <span>{{ btn2.texto }}</span>
                <div class="btn-circle"></div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
