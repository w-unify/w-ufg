<script setup lang="ts">
interface Boton {
  texto: string
  enlace: string
}

interface Props {
  titulo?: string
  subtitulo?: string
  descripcion?: string
  areas?: string[]
  pasos?: string[]
  botones?: Boton[]
}

withDefaults(defineProps<Props>(), {
  titulo: 'Prueba de Orientación Vocacional',
  subtitulo: '¿Aún estás por decidir qué carrera estudiar?',
  descripcion: 'La UFG te ayuda a tomar la mejor decisión, ven y realiza la <strong>Prueba de Orientación Vocacional POV</strong> y conoce tus aptitudes e intereses para elegir tu carrera profesional.',
  areas: () => ['Aptitudes', 'Capacidad Intelectual', 'Intereses', 'Personalidad'],
  pasos: () => [
    'Elegir el día y la hora para realizar la POV (según calendario establecido).',
    'Cancelar $12.00 en concepto de Prueba de Orientación Vocacional (factura a nombre de la persona que realizará el examen).',
    'Hacer cita previa para la realización de la prueba.',
    'Conectarse puntualmente en fecha y hora concertada. (Presentar factura de OV).'
  ],
  botones: () => [
    { texto: '2209-2873', enlace: 'tel:22092873' },
    { texto: 'hsiguenza@ufg.edu.sv', enlace: 'mailto:hsiguenza@ufg.edu.sv' }
  ]
})
</script>

<template>
  <section class="py-16 xl:py-24 bg-white">
    <div class="container mx-auto max-w-[1000px] px-6">
      <div class="text-center mb-10 xl:mb-16 reveal">
        <h2 class="font-futura-bold text-dark text-3xl xl:text-4xl">{{ titulo }}</h2>
      </div>

      <div class="max-w-[850px] mx-auto">
        <h3 class="font-futura-bold text-dark text-xl xl:text-2xl mb-6 reveal">{{ subtitulo }}</h3>

        <p class="text-dark/80 mb-10 leading-relaxed reveal delay-100" v-html="descripcion"></p>

        <!-- Áreas -->
        <div class="mb-10 reveal delay-200">
          <h4 class="font-futura-bold text-dark text-xl xl:text-2xl mb-6">Áreas que se evalúan:</h4>
          <div class="flex flex-wrap gap-x-8 gap-y-4">
            <div v-for="area in areas" :key="area" class="flex items-center gap-3">
              <svg class="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-dark/90 font-futura-bold">{{ area }}</span>
            </div>
          </div>
        </div>

        <!-- Pasos -->
        <div class="mb-12 reveal delay-300">
          <h4 class="font-futura-bold text-dark text-xl xl:text-2xl mb-6">Pasos:</h4>
          <ul class="space-y-4 list-disc pl-5 text-dark/80">
            <li v-for="(paso, i) in pasos" :key="i" class="leading-relaxed">{{ paso }}</li>
          </ul>
        </div>

        <!-- Agenda tu cita -->
        <div class="reveal delay-400">
          <h4 class="font-futura-bold text-dark text-xl xl:text-2xl mb-6">Agenda tu cita:</h4>
          <div class="flex flex-row flex-wrap items-start justify-start gap-3 xl:gap-4">
            <a
              v-for="(btn, i) in botones"
              :key="i"
              :href="btn.enlace"
              class="btn-primary btn-sm w-auto group inline-flex"
            >
              <span>{{ btn.texto }}</span>
              <div class="btn-circle"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
