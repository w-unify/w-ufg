<script setup lang="ts">
interface Presidente {
  titulo: string
  imgCircular?: string
  logo?: string
  parrafo?: string
}

interface Props {
  sectionTitle?: string
  presidentes?: Presidente[]
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Presidentes',
  presidentes: () => [],
})

const bgColors = ['bg-secondary', 'bg-asu']
</script>

<template>
  <section id="presidentes" class="py-16 xl:py-16">
    <div class="container mx-auto px-6">
      <h2 class="heading-2 mb-12 xl:mb-20 reveal">{{ sectionTitle }}</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 max-w-[1100px] mx-auto">
        <article
          v-for="(p, i) in presidentes"
          :key="i"
          class="flex flex-col reveal"
          :class="i > 0 ? 'delay-200' : ''"
        >
          <div class="relative pt-16">
            <div class="absolute top-0 left-6 xl:left-10 w-32 h-32 xl:w-40 xl:h-40 rounded-full overflow-hidden z-20">
              <img
                v-if="p.imgCircular"
                :src="p.imgCircular"
                :alt="p.titulo"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full bg-primary/20"></div>
            </div>

            <div
              class="rounded-card p-3 flex justify-end items-center min-h-[100px] xl:min-h-[120px] relative z-10"
              :class="bgColors[i % bgColors.length]"
            >
              <img
                v-if="p.logo"
                :src="p.logo"
                :alt="`Logo ${p.titulo}`"
                class="w-40 xl:w-48 h-auto"
              >
            </div>

            <div class="bg-muted rounded-card p-8 xl:p-10 -mt-6 pt-12 grow xl:min-h-[290px]">
              <div class="text-dark/80 mb-8 leading-relaxed" v-html="p.parrafo"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
