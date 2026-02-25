<script setup lang="ts">
interface HistoriaItem {
  fecha: string
  parrafo: string
}

interface Props {
  titulo?: string
  items?: HistoriaItem[]
}

withDefaults(defineProps<Props>(), {
  titulo: 'Nuestra Historia',
  items: () => [],
})
</script>

<template>
  <section id="historia" class="py-16 xl:py-24 bg-muted">
    <div class="container mx-auto px-6">
      <h2 class="heading-2 text-primary text-center mb-12 xl:mb-16 reveal">{{ titulo }}</h2>

      <div class="w-full overflow-x-auto pb-10 custom-scrollbar reveal">
        <div class="relative w-max px-4 pt-4">

          <div class="absolute top-5 left-0 w-full h-[2px] bg-dark/20 z-0"></div>

          <div class="flex flex-nowrap gap-8 relative z-10">
            <article
              v-for="(item, i) in items"
              :key="i"
              class="flex flex-col items-center pt-10 w-[300px] shrink-0"
            >
              <div class="absolute top-0 w-3 h-3 bg-dark rounded-full"></div>
              <div class="bg-white rounded-general p-5 xl:p-8 flex flex-col items-center text-center h-full shadow-sm">
                <span class="bg-accent text-white font-futura-bold px-8 py-1 rounded-full text-sm mb-4">{{ item.fecha }}</span>
                <div class="text-sm xl:text-base text-dark leading-snug" v-html="item.parrafo"></div>
              </div>
            </article>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
