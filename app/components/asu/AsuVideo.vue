<script setup lang="ts">
interface Props {
  titulo?: string
  url?: string
}

withDefaults(defineProps<Props>(), {
  titulo: 'Presentación',
  url: 'https://www.youtube.com/embed/_L20QkHmTU8',
})
</script>

<template>
  <section class="pt-16 pb-10 xl:pt-24">
    <div class="container mx-auto max-w-[1000px] px-6 text-center">
      <h2 class="heading-2 text-primary mb-6 reveal">{{ titulo }}</h2>
      <div class="bg-muted rounded-big p-4 xl:p-8 reveal delay-200">
        <div class="relative w-full aspect-video overflow-hidden rounded-card bg-gray-200">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            :src="url"
            title="Presentación UFG ASU"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
