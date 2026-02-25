<script setup lang="ts">
interface ClubItem {
  nombre: string
  horario: string
  modalidad: string
}

interface Props {
  titulo?: string
  imagenIzq?: string
  items?: ClubItem[]
}

withDefaults(defineProps<Props>(), {
  titulo: 'Clubes',
  imagenIzq: '',
  items: () => [],
})
</script>

<template>
  <section id="clubes" class="py-16 xl:py-16">
    <div class="container mx-auto px-6">
      <h2 class="heading-2 text-center mb-5 xl:mb-8 reveal">{{ titulo }}</h2>

      <div class="flex flex-col xl:flex-row items-stretch gap-5 xl:gap-8 max-w-[1200px] mx-auto">

        <!-- Imagen izquierda -->
        <div class="w-full xl:w-1/3 reveal">
          <div class="rounded-big overflow-hidden h-[400px] xl:h-[500px]">
            <img
              v-if="imagenIzq"
              :src="imagenIzq"
              class="w-full h-full object-cover"
              alt="Estudiantes UFG Clubes"
            >
            <div v-else class="w-full h-full bg-muted" />
          </div>
        </div>

        <!-- Lista de clubes -->
        <div class="w-full xl:w-2/3 border-2 border-muted rounded-big py-8 pl-6 pr-3 xl:py-12 xl:pl-12 xl:pr-5 reveal delay-200 h-[400px] xl:h-[500px] flex flex-col">
          <div class="grow overflow-y-auto pr-4 xl:pr-12 custom-scrollbar">
            <div class="flex flex-col divide-y divide-muted">
              <article
                v-for="(club, i) in items"
                :key="i"
                class="pb-5 pt-5 first:pt-0 border-b border-muted last:border-0"
              >
                <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-3 xl:gap-6">
                  <div class="flex items-start gap-2 xl:gap-4">
                    <div class="shrink-0 mt-2">
                      <span class="block w-5 h-5 xl:w-6 xl:h-6 rounded-full border-[3px] border-gray-200 bg-primary" />
                    </div>
                    <div class="space-y-2">
                      <h3 class="font-futura-bold text-dark text-base xl:text-xl leading-tight">
                        {{ club.nombre }}
                      </h3>
                      <div v-if="club.modalidad" class="inline-flex items-center gap-2 bg-muted px-4 py-1 rounded-full text-[13px]">
                        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>{{ club.modalidad }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="club.horario" class="xl:text-right pl-7 xl:pl-0">
                    <div class="inline-flex items-center gap-3 bg-dark/90 text-white px-5 py-1.5 rounded-full text-xs">
                      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span class="whitespace-nowrap">{{ club.horario }}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
