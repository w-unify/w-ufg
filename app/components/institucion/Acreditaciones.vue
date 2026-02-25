<script setup lang="ts">
interface Acreditacion {
  imagen: string
  titulo: string
}

interface Props {
  titulo?: string
  items?: Acreditacion[]
}

withDefaults(defineProps<Props>(), {
  titulo: 'Acreditaciones',
  items: () => [],
})
</script>

<template>
  <section class="py-16 xl:py-24 px-[18px] xl:px-[31px]">
    <div class="container mx-auto max-w-[1400px]">
      <h2 class="heading-2 text-primary text-center mb-10 xl:mb-16 reveal">{{ titulo }}</h2>

      <div class="flex flex-nowrap xl:flex-wrap justify-center items-start xl:items-center gap-0 md:gap-8 xl:gap-12">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="flex flex-col items-center text-center w-auto min-w-[80px] fade delay-400"
        >
          <div class="h-[100px] md:h-[120px] xl:h-[250px] flex items-center justify-center mb-2">
            <img
              :src="item.imagen"
              :alt="item.titulo"
              class="h-full w-auto object-contain"
            >
          </div>
          <p class="font-futura-bold text-xs md:text-sm xl:text-lg text-dark tracking-wider leading-tight max-w-[80px] md:max-w-none">
            {{ item.titulo }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
