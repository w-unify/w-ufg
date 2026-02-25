<script setup lang="ts">
interface AsistenciaItem {
  titulo: string
  imagenMiniBanner: string
  parrafo: string
  direccion: string
  correo: string
  telefono: string
  horario: string
}

interface Props {
  titulo?: string
  items?: AsistenciaItem[]
}

withDefaults(defineProps<Props>(), {
  titulo: 'Asistencias Estudiantiles',
  items: () => [],
})
</script>

<template>
  <section id="asistencias" class="py-16 xl:py-24 bg-muted">
    <div class="container mx-auto px-6">
      <h2 class="heading-2 text-center mb-8 xl:mb-12 reveal">{{ titulo }}</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-12 gap-y-12 max-w-[1200px] mx-auto items-stretch">
        <article
          v-for="(item, i) in items"
          :key="i"
          class="flex flex-col reveal"
          :class="i % 2 !== 0 ? 'delay-200' : ''"
        >
          <!-- Card blanca -->
          <div class="bg-white rounded-[30px] overflow-hidden xl:min-h-[700px] pb-16 xl:pb-10 flex flex-col">
            <!-- Mini banner -->
            <div class="relative h-[150px] shrink-0">
              <img
                v-if="item.imagenMiniBanner"
                :src="item.imagenMiniBanner"
                class="w-full h-full object-cover"
                alt=""
              >
              <div v-else class="w-full h-full bg-primary/20" />
              <div class="absolute inset-0 bg-black/30 flex items-center justify-center p-8 text-center">
                <h3 class="font-futura-bold text-white text-2xl xl:text-3xl leading-tight" v-html="item.titulo" />
              </div>
            </div>
            <!-- Párrafo -->
            <div class="p-8 xl:p-10 grow">
              <p class="text-base text-dark/80 leading-relaxed">{{ item.parrafo }}</p>
            </div>
          </div>

          <!-- Card azul flotante -->
          <div class="relative z-10 -mt-16 mx-4 xl:mx-10 bg-primary rounded-[30px] px-6 py-8 xl:px-8 xl:py-10 text-white">
            <div class="space-y-5">
              <div v-if="item.direccion" class="flex items-start gap-2 xl:gap-3">
                <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p class="text-base text-white">{{ item.direccion }}</p>
              </div>
              <div v-if="item.telefono" class="flex items-center gap-4">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <p class="text-base text-white">{{ item.telefono }}</p>
              </div>
              <div v-if="item.correo" class="flex items-center gap-4">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <p class="text-base text-white">{{ item.correo }}</p>
              </div>
              <div v-if="item.horario" class="flex items-start gap-4">
                <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div class="text-base" v-html="item.horario" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
