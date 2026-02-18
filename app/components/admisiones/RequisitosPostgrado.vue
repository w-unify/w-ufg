<script setup lang="ts">
interface Paso {
  numero: number
  contenido: string
  ctaText?: string
  ctaLink?: string
  lista?: string[]
}

interface Props {
  sectionTitle?: string
  pasos?: Paso[]
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Requisitos de Admisión de Postgrado',
  pasos: () => [
    {
      numero: 1,
      contenido: 'Completa tu Solicitud de Admisión',
      ctaText: 'SOLICITUD DE ADMISIÓN',
      ctaLink: 'https://admisiones.ufg.edu.sv/solicitud'
    },
    {
      numero: 2,
      contenido: 'Adjunta la siguiente documentación',
      lista: [
        'DUI',
        'Curriculum Vitae actualizado',
        'Título Universitario y certificado de registro MINED',
        'Título Universitario y reincorporación (si es extranjero)',
        'Análisis de perfil',
        'Experiencia profesional',
        'Desempeño académico'
      ]
    },
    {
      numero: 3,
      contenido: 'Notificación de resolución de solicitud por medio de correo electrónico y llamada telefónica'
    }
  ]
})
</script>

<template>
  <section class="py-12 xl:py-24 bg-muted">
    <div class="container mx-auto max-w-[1200px] px-6">
      <h2 class="heading-2 text-center text-primary mb-12 xl:mb-16 reveal">{{ sectionTitle }}</h2>

      <div class="flex flex-col xl:flex-row gap-5 xl:gap-8">
        <!-- Label lateral -->
        <div class="hidden xl:block w-[280px] shrink-0">
          <div class="sticky top-[130px]">
            <div class="tab-btn active w-full flex items-center justify-between cursor-default">
              <span>Postgrado</span>
              <svg class="w-4 h-4 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Contenido -->
        <div class="flex-1 relative xl:bg-white xl:rounded-listing-card xl:p-12 xl:shadow-sm">
          <div class="absolute left-2 xl:left-12 top-4 bottom-4 w-px bg-dark/20 z-0"></div>

          <div class="space-y-12 relative z-10">
            <div
              v-for="paso in pasos"
              :key="paso.numero"
              class="relative pl-10 xl:pl-8 reveal"
              :class="`delay-${paso.numero * 100}`"
            >
              <div class="absolute left-[4px] xl:left-[-4px] top-2 w-2 h-2 rounded-full bg-dark"></div>

              <div class="flex flex-col xl:flex-row xl:items-start gap-2 xl:gap-4">
                <span class="text-2xl font-futura-bold leading-none shrink-0">{{ paso.numero }}.</span>
                <div class="pt-1">
                  <p class="mb-4 xl:mb-6 leading-relaxed">{{ paso.contenido }}</p>
                  <ul v-if="paso.lista" class="list-disc pl-5 space-y-2 mb-4">
                    <li v-for="(item, i) in paso.lista" :key="i" class="text-dark/80">{{ item }}</li>
                  </ul>
                  <a
                    v-if="paso.ctaText && paso.ctaLink"
                    :href="paso.ctaLink"
                    target="_blank"
                    rel="noopener"
                    class="btn-primary btn-sm group inline-flex"
                  >
                    <span>{{ paso.ctaText }}</span>
                    <div class="btn-circle"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
