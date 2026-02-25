<script setup lang="ts">
interface Props {
  imagenes?: string[]
}

withDefaults(defineProps<Props>(), {
  imagenes: () => [],
})
</script>

<template>
  <section id="galeria" class="py-16 xl:py-24 bg-white">
    <div class="container mx-auto px-6">
      <h2 class="heading-2 text-center mb-12 xl:mb-16 reveal">Galería</h2>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 max-w-[1200px] mx-auto">
        <a
          v-for="(img, i) in imagenes"
          :key="i"
          :href="img"
          target="_blank"
          class="group relative block overflow-hidden rounded-[20px] aspect-square bg-gray-100 reveal"
          :class="`delay-${(i % 4) * 100}`"
        >
          <img
            :src="img"
            :alt="`Experiencia UFG ASU ${i + 1}`"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          >
          <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
