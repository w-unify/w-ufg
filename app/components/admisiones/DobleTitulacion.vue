<script setup lang="ts">
interface RequisitoSlide {
  titulo: string
  subtitulo: string
  contenido: string
}

interface CostoItem {
  label: string
  monto: string
  bold?: boolean
}

interface Props {
  videoUrl?: string
  requisitos?: RequisitoSlide[]
  costos?: CostoItem[]
  totalLabel?: string
  totalMonto?: string
  notas?: string[]
  politicas?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  videoUrl: 'https://www.youtube.com/embed/o46K1-GRlX4',
  requisitos: () => [
    {
      titulo: 'Para inscribirte en UFG (Año 0)',
      subtitulo: 'Proceso de inscripción a carreras de doble titulación (Nuevo Ingreso)',
      contenido: '1. Recibir asesoría académica.<br>2. Completar formulario de admisión.<br>3. Pago del curso de inducción universitaria.<br>4. Proceso de documentación en línea.<br>5. Inscripción de asignaturas.<br>6. Pago de aranceles.'
    },
    {
      titulo: 'Para inscribirte en ASU (Año 3)',
      subtitulo: 'Proceso de inscripción a carreras de doble titulación en ASU',
      contenido: '1. <strong>Haber cursado todas las asignaturas del ciclo 1 al 6</strong> para cumplir tu requisito académico.<br>2. <strong>Dominio de Idioma Inglés a nivel B2</strong>. Desde el inicio de tu carrera podrás cursar el Programa de Profesionales Bilingües que UFG te ofrece sin costo.<br>3. <strong>Trámite documental y pago de aranceles ASU</strong>, incluyendo transcript de asignaturas aprobadas en UFG.<br>4. <strong>Visa estudiante EEUU</strong> mediante entrevista en la Embajada de EEUU presentando documentación que en UFG y ASU te brindarán.'
    }
  ],
  costos: () => [
    { label: 'Curso Propedéutico', monto: '$40.00' },
    { label: 'Costo de Inscripción al Ciclo', monto: '$450.00', bold: true },
    { label: 'Matrícula', monto: '$225.00' },
    { label: 'Cuota 01 - Ciclo Académico', monto: '$225.00' },
    { label: 'Ciclo Académico (Pagadero en 5 cuotas de $225.00 c/u)', monto: '$1125.00' }
  ],
  totalLabel: 'Costo Global del Ciclo de Admisión',
  totalMonto: '$1615.00',
  notas: () => [
    'Tendrás 48 horas para pagar, después de haber completado la inscripción en el sistema.',
    'El arancel por cada asignatura que sea dada por equivalencia externa es de $6.00, los cuales debes pagar dentro de los próximos 4 meses de tu Ciclo de Admisión.',
    'Deberás presentar la documentación en original en la fecha que se te indique.'
  ],
  politicas: () => [
    'El Programa 3+1 UFG–ASU representa una oportunidad única de formación internacional para estudiantes salvadoreños y de la región, promoviendo el desarrollo de profesionales competitivos, bilingües y con visión global.',
    'Arizona State University es la universidad pública de investigación más grande de los Estados Unidos, reconocida por su modelo de inclusión, excelencia académica e innovación educativa.',
    'Más información disponible en: www.asu.edu o en los canales oficiales de la Universidad Francisco Gavidia.'
  ]
})

</script>

<template>
  <div>
    <!-- Video -->
    <section class="pt-16 pb-10 xl:pt-24 bg-muted">
      <div class="container mx-auto max-w-[1000px] px-6 text-center">
        <h2 class="font-futura-bold text-dark text-2xl xl:text-3xl mb-6 reveal">
          Programas de Doble Titulación
        </h2>
        <div class="bg-white rounded-big p-4 xl:p-8 reveal delay-200">
          <div class="relative w-full aspect-video overflow-hidden rounded-card bg-gray-200">
            <iframe
              class="absolute top-0 left-0 w-full h-full"
              :src="videoUrl"
              title="Programas de Doble Titulación UFG"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Requisitos específicos -->
    <section class="pb-16 xl:pb-24 bg-muted">
      <div class="container mx-auto max-w-[1000px] px-6">
        <h3 class="font-futura-bold text-xl mb-6 reveal">
          Requisitos Específicos:
        </h3>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 reveal delay-200">
          <article
            v-for="(req, index) in requisitos"
            :key="index"
            class="bg-white rounded-card p-6 xl:p-10 flex flex-col border border-dark/5"
          >
            <h4 class="text-primary text-lg xl:text-xl mb-3">{{ req.titulo }}</h4>
            <p class="font-futura-bold text-dark mb-4">{{ req.subtitulo }}</p>
            <div class="text-dark/80 text-sm xl:text-base leading-relaxed space-y-2" v-html="req.contenido"></div>
          </article>
        </div>
      </div>
    </section>

    <!-- Costos -->
    <section class="bg-white py-12 xl:py-16 px-6 xl:px-0">
      <div class="container mx-auto max-w-[850px]">
        <h3 class="font-futura-bold text-xl mb-6 reveal">Costos del programa de Doble Titulación:</h3>

        <div class="max-w-[850px] mx-auto border border-[#3A3D3B] rounded-card p-6 md:p-8 xl:px-12 xl:py-10 reveal delay-200">
          <div class="flex flex-col gap-3 xl:gap-4">
            <div v-for="(costo, i) in costos" :key="i" class="flex justify-between items-center">
              <p :class="costo.bold ? 'font-futura-bold text-dark' : 'font-futura text-dark'" class="leading-[1.2] text-base xl:text-lg">
                {{ costo.label }}
              </p>
              <p :class="costo.bold ? 'font-futura-bold text-dark' : 'text-dark'" class="text-base xl:text-lg shrink-0 ml-4">
                {{ costo.monto }}
              </p>
            </div>
            <div class="border-t border-[#3A3D3B] mt-4 pt-6 flex justify-between items-center">
              <p class="font-futura-bold text-accent text-base leading-[1.2] xl:text-lg max-w-[200px] md:max-w-none">
                {{ totalLabel }}
              </p>
              <p class="font-futura-bold text-accent text-base xl:text-lg shrink-0 ml-4">{{ totalMonto }}</p>
            </div>
          </div>
        </div>

        <div class="max-w-[850px] mx-auto mt-6 space-y-3 reveal delay-300">
          <p class="font-futura-bold text-dark">Importante:</p>
          <ol class="list-decimal list-outside pl-5 space-y-2">
            <li v-for="(nota, i) in notas" :key="i" class="text-dark/80 text-sm xl:text-base leading-relaxed">{{ nota }}</li>
          </ol>
          <div class="pt-4 space-y-3">
            <p class="font-futura-bold text-dark/70 text-sm xl:text-base">Políticas del programa:</p>
            <p v-for="(pol, i) in politicas" :key="i" class="text-[13px] xl:text-[15px] leading-relaxed text-dark/70">{{ pol }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
