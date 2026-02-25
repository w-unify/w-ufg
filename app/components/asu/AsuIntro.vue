<script setup lang="ts">
interface Props {
  titulo?: string
  parrafo?: string
}

withDefaults(defineProps<Props>(), {
  titulo: '¿Qué significa que la UFG esté potenciada por Arizona State University?',
  parrafo: '',
})
</script>

<template>
  <section class="py-16 xl:py-24 bg-white">
    <div class="container mx-auto max-w-[1200px] px-6 text-center">
      <h1 class="heading-2 text-primary mb-8 xl:mb-10 reveal">{{ titulo }}</h1>
      <div
        class="text-dark/80 leading-relaxed text-base xl:text-lg prose prose-p:mb-4 max-w-none text-center reveal delay-100"
        v-html="parrafo"
      ></div>
    </div>
  </section>
</template>
