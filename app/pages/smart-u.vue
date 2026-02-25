<script setup lang="ts">
interface Boton {
  texto: string
  icono?: string
  enlace: string
}

interface ReinscripcionData {
  titulo: string
  parrafo: string
  btnTexto: string
  btnUrl: string
}

interface BeneficiosData {
  titulo: string
  imagenIzq: string
  parrafo: string
  btn1: Boton | null
  btn2: Boton | null
}

interface FechaItem {
  fechaTitulo: string
  fechaDiaHora: string
}

interface FechasData {
  titulo: string
  imagenIzq: string
  items: FechaItem[]
}

interface AsesoriaData {
  parrafo: string
  imagen: string
  nombre: string
  cargo: string
  botones: Boton[]
}

interface FaqItem {
  titulo: string
  parrafo: string
  imagen?: string
}

interface FaqsData {
  titulo: string
  items: FaqItem[]
}

interface SmartUPageData {
  reinscripcion: ReinscripcionData
  beneficios: BeneficiosData
  fechas: FechasData
  asesoria: AsesoriaData | null
  faqs: FaqsData | null
}

useScrollAnimations()

const { data, pending, error } = await useFetch<SmartUPageData>('/api/squidex/pagina-smart-u')

useHead({
  title: 'Smart U - UFG',
  meta: [
    { name: 'description', content: 'Smart U: reinscripción, beneficios, descuentos y fechas importantes para estudiantes UFG.' },
    { name: 'keywords', content: 'Smart U UFG, reinscripción UFG, beneficios estudiantes UFG, fechas importantes UFG' }
  ]
})
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center min-h-[60vh]">
      <p class="font-futura-bold text-primary text-xl animate-pulse">Cargando...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[60vh] px-6">
      <div class="text-center max-w-md">
        <h2 class="font-futura-bold text-2xl text-dark mb-4">Error al cargar contenido</h2>
        <p class="text-dark/70 text-sm">{{ error.message }}</p>
      </div>
    </div>

    <!-- Contenido -->
    <template v-else>
      <!-- Hero Title -->
      <section class="relative pt-[30px] xl:pt-[40px] 2xl:pt-[170px] pb-[35px] xl:pb-[40px] 2xl:pb-[50px]">
        <div class="container mx-auto max-w-[1400px] px-5">
          <h1 class="heading-1">{{ data?.reinscripcion.titulo ?? 'Smart U' }}</h1>
        </div>
      </section>

      <!-- Sección 1: Reinscripción -->
      <SmartUReinscripcion
        v-if="data"
        :parrafo="data.reinscripcion.parrafo"
        :btn-texto="data.reinscripcion.btnTexto"
        :btn-url="data.reinscripcion.btnUrl"
      />

      <!-- Sección 2: Beneficios y Descuentos -->
      <SmartUBeneficios
        v-if="data"
        :titulo="data.beneficios.titulo"
        :imagen-izq="data.beneficios.imagenIzq"
        :parrafo="data.beneficios.parrafo"
        :btn1="data.beneficios.btn1"
        :btn2="data.beneficios.btn2"
      />

      <!-- Sección 3: Fechas Importantes -->
      <SmartUFechas
        v-if="data"
        :titulo="data.fechas.titulo"
        :imagen-izq="data.fechas.imagenIzq"
        :items="data.fechas.items"
      />

      <!-- Sección 4: Asesoría General -->
      <SmartUAsesoria
        v-if="data?.asesoria"
        :parrafo="data.asesoria.parrafo"
        :imagen="data.asesoria.imagen"
        :nombre="data.asesoria.nombre"
        :cargo="data.asesoria.cargo"
        :botones="data.asesoria.botones"
      />

      <!-- FAQs -->
      <SmartUFaqs
        v-if="data?.faqs"
        :titulo="data.faqs.titulo"
        :items="data.faqs.items"
      />

    </template>
  </div>
</template>
