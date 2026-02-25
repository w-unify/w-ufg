<script setup lang="ts">
interface Props {
  titulo?: string
  imagen?: string
}

withDefaults(defineProps<Props>(), {
  titulo: 'Organización Funcional de la Universidad Francisco Gavidia',
  imagen: '',
})
</script>

<template>
  <section id="organigrama" class="py-16 xl:py-24">
    <div class="container mx-auto px-6 max-w-[900px]">
      <h2 class="heading-2 text-primary text-center mb-12 xl:mb-16 reveal">{{ titulo }}</h2>

      <div class="flex justify-center items-center gap-2 mt-4 xl:hidden text-dark/40 animate-pulse">
        <span class="text-[12px] font-bold uppercase tracking-widest">Desliza para ver más</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      <div class="w-full overflow-x-auto pb-6 custom-scrollbar reveal">
        <div class="min-w-[900px] xl:min-w-full flex justify-center">
          <img
            v-if="imagen"
            :src="imagen"
            class="w-full h-auto max-w-[800px] pointer-events-none select-none"
            alt="Organigrama Institucional UFG"
          >
          <div v-else class="w-full h-64 bg-muted rounded-general flex items-center justify-center text-dark/40">
            <span class="font-futura-bold">Organigrama no disponible</span>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-2 mt-4 xl:hidden text-dark/40 animate-pulse">
        <span class="text-[12px] font-bold uppercase tracking-widest">Desliza para ver más</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

    </div>
  </section>
</template>
