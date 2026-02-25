<script setup lang="ts">
interface CuadriculaItem {
  parrafo: string
  imagen: string
}

interface Props {
  items?: CuadriculaItem[]
}

withDefaults(defineProps<Props>(), {
  items: () => [],
})
</script>

<template>
  <section id="rsu" class="pb-8 bg-white">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 max-w-[1200px] mx-auto">
        <article
          v-for="(item, i) in items"
          :key="i"
          class="relative overflow-hidden rounded-listing-card group h-[400px] md:h-[450px] xl:h-[500px] reveal"
          :class="i % 2 !== 0 ? 'delay-200' : ''"
        >
          <img
            v-if="item.imagen"
            :src="item.imagen"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt=""
          >
          <div class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-8 text-center text-white">
            <div v-html="item.parrafo"></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
