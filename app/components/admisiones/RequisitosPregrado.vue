<script setup lang="ts">
interface StepCard {
  numero: number
  contenido: string
}

interface TabContent {
  id: string
  label: string
  pasos: StepCard[]
  notas?: string[]
}

interface Props {
  sectionTitle?: string
  tabs?: TabContent[]
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: 'Requisitos de Admisión de Pregrado',
  tabs: () => [
    {
      id: 'nuevo-ingreso',
      label: 'Nuevo Ingreso',
      pasos: [
        { numero: 1, contenido: '<strong>Completa tu formulario de admisión</strong><br>Inicia tu proceso llenando el Formulario de Admisión en <a href="https://admisiones.ufg.edu.sv/solicitud/" class="text-primary underline" target="_blank">admisiones.ufg.edu.sv/solicitud/</a>. Recibirás un correo con el enlace para completar tu Solicitud de Admisión y obtener automáticamente tu número de carné.' },
        { numero: 2, contenido: '<strong>Paga el Curso de Inducción Universitaria ($40.00)</strong><br>Puedes hacerlo en: Banco Davivienda, Banco Promerica, En línea desde tu WebDesktop UFG, solicitando tus credenciales al correo: admisiones@ufg.edu.sv (sede San Salvador).' },
        { numero: 3, contenido: '<strong>Inscríbete al Curso de Inducción Universitaria</strong><br>Fechas: del 25 de agosto de 2025 al 15 de enero de 2026. Sube tus documentos en formato PDF a la plataforma de Documentación en Línea y elige modalidad y horario.<br><br>Documentos requeridos: Partida de nacimiento reciente, Título de bachiller, DUI y NIT (si aplica), Fotografía tamaño carné (3.5 cm x 4.5 cm), Resultados de PAES o Prueba AVANZO, Notas finales de 2.º año (para bachilleres 2023), Comprobante de pago del curso.' },
        { numero: 4, contenido: '<strong>Validación de documentos</strong><br>Un especialista revisará tu solicitud y te notificará por correo con tu comprobante de inscripción y la fecha para entregar los documentos originales en Admisiones.' },
        { numero: 5, contenido: '<strong>Inscripción de asignaturas</strong><br>Luego de tu inscripción al Curso de Inducción, podrás elegir horarios y materias según la Oferta Académica vigente. No es necesario haber finalizado el curso para inscribirte.' },
        { numero: 6, contenido: '<strong>Pago de inscripción</strong><br>Pagá tu matrícula, cuota académica y aranceles según el detalle mostrado en el sistema. Podés hacerlo en bancos autorizados, desde tu WebDesktop o App UFG (Visa o Mastercard).' }
      ],
      notas: [
        'En caso de que tu título se haya extraviado, tramita la reposición en el Ministerio de Educación, Ciencia y Tecnología.',
        'Si acabas de salir de bachillerato, presenta la boleta de notas de la Prueba AVANZO y las notas de segundo año de bachillerato.',
        'Si has estudiado en el extranjero, presenta el Diploma en original apostillado con sus notas, más fotocopia y el Acuerdo de Incorporación emitido por el MINEDUCYT.',
        'Si perteneces al Programa EDÚCAME, presenta las notas de segundo año de bachillerato, resultado AVANZO y una constancia de la sede EDÚCAME.',
        'Al completar el Proceso de Admisión, podrás Inscribir asignaturas al Ciclo según el Calendario Académico.'
      ]
    },
    {
      id: 'equivalencias',
      label: 'Ingreso por Equivalencias',
      pasos: [
        { numero: 1, contenido: 'Inicia tu Proceso de Admisión del Lunes 25 de agosto del 2025 al Jueves 15 de enero de 2026 completando el <a href="https://admisiones.ufg.edu.sv/solicitud/" class="text-primary underline" target="_blank">Formulario en Línea</a>.' },
        { numero: 2, contenido: 'Recibirás un correo electrónico con un enlace para completar la Solicitud de Admisión. Una vez completada, se te brindará automáticamente tu número de carné.' },
        { numero: 3, contenido: 'Envía vía correo electrónico la Certificación de Notas de tu institución de procedencia que describa las Unidades Valorativas (UV) de las asignaturas aprobadas, más el Comprobante de Pago del Estudio de Equivalencias. El estudio se realizará en un máximo de 8 días hábiles.' },
        { numero: 4, contenido: 'Cuando hayas recibido el Estudio de Equivalencias en formato digital y estés de acuerdo con las equivalencias otorgadas, notifícalo al correo electrónico.' },
        { numero: 5, contenido: 'Aloja los documentos requeridos en la plataforma de Documentación en Línea, en formato PDF.<br><br>Documentos a entregar:<br>• Partida de nacimiento reciente<br>• Título de bachiller<br>• DUI y NIT (si aplica)<br>• Fotografía blanco y negro o a color, tamaño carné (3.5cm x 4.5cm)<br>• Resultado de AVANZO<br>• Certificación de Notas<br>• Estudio de Equivalencia' },
        { numero: 6, contenido: 'Los documentos y la Solicitud de Admisión serán validados por un especialista, quien te notificará la fecha para que presentes la documentación original en las oficinas de Admisiones.' },
        { numero: 7, contenido: 'Solicita la Asesoría de Inscripción de Asignaturas con el coordinador de tu carrera vía correo electrónico. Te indicará las asignaturas a inscribir según la Oferta Académica vigente.' },
        { numero: 8, contenido: 'Después de haber inscrito asignaturas, paga el Costo de Inscripción conforme el detalle mostrado en el sistema, el cual incluye Matrícula, una Cuota Académica, Gastos de Administración, prácticas, laboratorios u otros aranceles. Podés realizarlo en los bancos autorizados, ingresando a tu WebDesktop o por medio de la App UFG.' }
      ],
      notas: [
        'Tendrás 48 horas para pagar, después de haber completado la inscripción en el sistema.',
        'El arancel por cada asignatura que sea dada por equivalencia externa es de $6.00, los cuales debes pagar dentro de los próximos 4 meses de tu Ciclo de Admisión.',
        'Deberás presentar la documentación en original en la fecha que se te indique.'
      ]
    }
  ]
})

const activeTab = ref(props.tabs?.[0]?.id ?? '')
</script>

<template>
  <section class="py-16 xl:py-24 bg-muted">
    <div class="container mx-auto max-w-[1200px] px-6">
      <h2 class="heading-2 text-center text-primary mb-12 xl:mb-16 reveal">{{ sectionTitle }}</h2>

      <div class="flex flex-col xl:flex-row gap-5 xl:gap-8">
        <!-- Tabs nav -->
        <div class="w-full xl:w-[280px] shrink-0">
          <div class="sticky top-[130px] flex xl:flex-col gap-3 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-btn whitespace-nowrap xl:whitespace-normal w-auto xl:w-full flex items-center justify-between"
              :class="activeTab === tab.id ? 'active' : ''"
              @click="activeTab = tab.id"
            >
              <span class="text-base p-2 xl:p-0">{{ tab.label }}</span>
              <svg class="w-4 h-4 hidden xl:block ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Tab content -->
        <div class="flex-1">
          <template v-for="tab in tabs" :key="tab.id">
            <div v-show="activeTab === tab.id" class="space-y-4">
              <div v-for="paso in tab.pasos" :key="paso.numero" class="step-card">
                <div class="step-number">{{ paso.numero }}</div>
                <div class="step-body">
                  <p v-html="paso.contenido"></p>
                </div>
              </div>

              <div v-if="tab.notas && tab.notas.length > 0" class="pt-2">
                <!-- <p class="font-futura-bold text-dark mb-3">Importante:</p> -->
                <div class="space-y-4">
                  <p v-for="(nota, i) in tab.notas" :key="i" class="text-dark/80 text-sm xl:text-base leading-relaxed">
                    {{ nota }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
