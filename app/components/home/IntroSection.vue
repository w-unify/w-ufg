<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Universidad Francisco Gavidia',
  subtitle: '¡Educación Local, con Impacto Global!'
})
</script>

<template>
  <section class="py-16 xl:py-24 px-[20px] xl:px-[31px] text-center">
    <div class="max-w-[1400px] mx-auto">
      <h1 class="font-futura-bold text-primary text-2xl leading-[30px] xl:text-4xl xl:leading-[40px]">
        {{ title }}
      </h1>
      <p class="font-futura-bold text-primary text-2xl leading-[30px] xl:text-4xl xl:leading-[40px]">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
