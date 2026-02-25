<script setup lang="ts">
interface Publicacion {
  imagen: string
  titulo: string
  categoria: string
  botonNombre: string
  botonUrl: string
}

interface Props {
  titulo?: string
  items?: Publicacion[]
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Publicaciones',
  items: () => [],
})

const searchQuery = ref('')

const filtered = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return props.items
  return props.items.filter(p =>
    p.titulo.toLowerCase().includes(q) ||
    p.categoria.toLowerCase().includes(q)
  )
})
</script>

<template>
  <section id="publicaciones" class="pb-12 pt-12 xl:pb-20 xl:pt-20">
    <div class="container mx-auto max-w-[1200px] px-6">

      <h2 class="heading-2 text-primary text-center mb-6 reveal">{{ titulo }}</h2>

      <!-- Buscador -->
      <div class="relative w-full xl:w-[450px] mx-auto mb-12 fade delay-400">
        <div class="relative flex items-center">
          <div class="absolute left-5 w-5 h-5 flex items-center justify-center pointer-events-none">
            <svg class="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar..."
            class="w-full bg-primary/5 border border-primary rounded-xl py-2 pl-14 pr-6 text-dark text-sm placeholder:text-primary/50 focus:outline-none focus:border-primary transition-all"
          >
        </div>
      </div>

      <!-- Grid de publicaciones -->
      <div class="flex flex-wrap justify-center gap-6 xl:gap-8">
        <article
          v-for="(pub, i) in filtered"
          :key="i"
          class="flex flex-col bg-muted rounded-listing-card overflow-hidden transition-all duration-300 reveal w-full md:w-[calc(50%-24px)] xl:w-[calc(33.33%-32px)] max-w-[380px]"
        >
          <div class="p-4 xl:p-5">
            <div class="relative aspect-[4/5] overflow-hidden rounded-listing-img mx-auto">
              <img
                v-if="pub.imagen"
                :src="pub.imagen"
                class="w-full h-full object-cover"
                :alt="pub.titulo"
              >
              <div v-else class="w-full h-full bg-primary/10 flex items-center justify-center">
                <span class="text-primary/40 font-futura-bold text-sm text-center px-4">{{ pub.titulo }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col grow px-5 pb-6 text-center items-center">
            <span
              v-if="pub.categoria"
              class="bg-primary/10 text-primary font-futura-bold text-[10px] px-3 py-1 rounded-full mb-3 uppercase"
            >
              {{ pub.categoria }}
            </span>
            <h3 class="font-futura-bold text-dark text-base leading-[1.1] mb-4 grow line-clamp-3">
              {{ pub.titulo }}
            </h3>
            <a
              :href="pub.botonUrl"
              target="_blank"
              rel="noopener"
              class="btn-secondary btn-sm group"
            >
              <span>{{ pub.botonNombre }}</span>
              <div class="btn-circle"></div>
            </a>
          </div>
        </article>

        <!-- Sin resultados -->
        <div v-if="filtered.length === 0" class="w-full text-center py-12 text-dark/50">
          <p class="font-futura-bold text-lg">No se encontraron publicaciones</p>
        </div>
      </div>

    </div>
  </section>
</template>
