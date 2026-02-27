<script setup lang="ts">
interface Props {
  nombre: string
  slug: string
  descripcionCorta?: string
  modalidad?: string
  esASU?: boolean
  imagen?: string
  ciclos?: string[]
}

const props = defineProps<Props>()

// Formatear texto de ciclos: "Ciclo 01 (Enero)" o "Ciclo 01 / Ciclo 02 (Junio)"
const ciclosText = computed(() => {
  if (!props.ciclos || props.ciclos.length === 0) return ''
  return props.ciclos.join(' / ')
})
</script>

<template>
  <article class="relative flex bg-white rounded-listing-card h-[150px] xl:h-[200px] overflow-hidden shadow-lg hover:shadow-card transition-shadow duration-300 border border-dark/8 hover:border-primary/20">
    <!-- Image -->
    <div class="relative w-[130px] xl:w-[200px] shrink-0 p-2 xl:p-3">
      <div class="relative h-full overflow-hidden rounded-listing-img">
        <NuxtLink :to="`/carreras/${slug}`">
          <img 
            v-if="imagen" 
            :src="imagen" 
            :alt="nombre" 
            class="w-full h-full object-cover"
          >
          <div v-else class="w-full h-full bg-primary/10 flex items-center justify-center">
            <span class="text-primary text-xs">Sin imagen</span>
          </div>
        </NuxtLink>
        <!-- Tag ASU -->
        <div 
          v-if="esASU" 
          class="absolute bottom-2 left-2 xl:bottom-2.5 xl:left-2.5 w-[30px] h-[30px] xl:w-[60px] xl:h-[60px] z-10"
        >
          <img src="/img/carreras/asu-circulo.webp" alt="ASU" class="w-full h-full object-contain">
        </div>
      </div>
    </div>
    <!-- Info -->
    <div class="flex flex-col justify-center flex-grow p-4 pl-0 xl:pl-3 pr-4 xl:pr-10">
      <h3 class="font-futura-bold text-dark text-lg xl:text-2xl leading-[1.1]">
        <NuxtLink :to="`/carreras/${slug}`">{{ nombre }}</NuxtLink>
      </h3>
      <p v-if="ciclosText" class="font-futura text-dark text-xs xl:text-sm mt-1 opacity-70">
        {{ ciclosText }}
      </p>
    </div>
    <!-- Boton -->
    <div class="absolute bottom-3 right-4 xl:bottom-5 xl:right-8">
      <NuxtLink :to="`/carreras/${slug}`" class="btn-secondary btn-sm scale-90 xl:scale-100 origin-right">
        <span>VER MÁS</span>
        <div class="btn-circle"></div>
      </NuxtLink>
    </div>
    <!-- Tag Modalidad -->
    <div 
      v-if="modalidad" 
      class="absolute top-0 right-0 bg-primary text-white font-futura-bold text-[9px] xl:text-xs px-4 xl:px-6 py-1.5 xl:py-2 label-radius"
    >
      {{ modalidad }}
    </div>
  </article>
</template>
