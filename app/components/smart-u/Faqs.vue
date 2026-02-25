<script setup lang="ts">
interface FaqItem {
  titulo: string
  parrafo: string
  imagen?: string
}

interface Props {
  titulo?: string
  items?: FaqItem[]
}

withDefaults(defineProps<Props>(), {
  titulo: 'FAQs',
  items: () => [],
})
</script>

<template>
  <section class="py-16 xl:py-24 bg-primary text-white">
    <div class="container mx-auto px-6 max-w-[1000px]">

      <h2 class="heading-2 text-white! text-center mb-12 reveal">
        {{ titulo }}
      </h2>

      <div class="flex flex-col border-t border-white/30">
        <details
          v-for="(item, i) in items"
          :key="i"
          class="group border-b border-white/30 py-6 xl:py-8 cursor-pointer"
        >
          <summary class="flex items-center justify-between list-none focus:outline-none">
            <h3 class="text-lg xl:text-xl font-futura-bold pr-4">
              {{ item.titulo }}
            </h3>
            <div class="relative w-6 h-6 shrink-0">
              <span class="absolute inset-0 m-auto w-full h-0.5 bg-white transition-transform duration-300 group-open:rotate-90"></span>
              <span class="absolute inset-0 m-auto w-full h-0.5 bg-white"></span>
            </div>
          </summary>
          <div class="pt-6 text-base xl:text-lg opacity-90 leading-relaxed max-w-[850px]" v-html="item.parrafo"></div>
        </details>
      </div>

    </div>
  </section>
</template>
