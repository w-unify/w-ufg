<script setup lang="ts">
const { data, error, status } = await useFetch('/api/squidex/pagina-vida-estudiantil')
useScrollAnimations()
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="status === 'pending'" class="min-h-screen flex items-center justify-center">
      <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center px-6">
      <div class="text-center">
        <p class="font-futura-bold text-primary text-xl mb-2">Error al cargar la página</p>
        <p class="text-dark/70 text-sm">{{ error.message }}</p>
      </div>
    </div>

    <!-- Contenido -->
    <template v-else>

      <!-- Hero Title -->
      <section class="relative pt-[30px] xl:pt-[40px] 2xl:pt-[170px] pb-[35px] xl:pb-[40px] 2xl:pb-[50px]">
        <div class="container mx-auto max-w-[1400px] px-5">
          <div class="heading-1" v-html="data?.tituloPagina ?? 'Vida Estudiantil'" />
        </div>
      </section>

      <!-- Sección 1: Calendario Académico -->
      <VidaEstudiantilCalendarioAcademico
        :titulo="data?.calendarioTitulo"
        :events="data?.calendarioEvents ?? []"
      />

      <!-- Sección 2: Eventos -->
      <VidaEstudiantilEventos
        v-if="data?.eventos?.length"
        :titulo="data?.eventosTitulo"
        :items="data.eventos"
      />

      <!-- Sección 3: Clubes -->
      <VidaEstudiantilClubes
        v-if="data?.clubes?.length"
        :titulo="data?.clubesTitulo"
        :imagen-izq="data?.clubesImagenIzq"
        :items="data.clubes"
      />

      <!-- Sección 4: Galería -->
      <VidaEstudiantilGaleria
        v-if="data?.galeria?.length"
        titulo="Galería"
        :imagenes="data.galeria"
      />

      <!-- Sección 5: Asistencias Estudiantiles -->
      <VidaEstudiantilAsistencia
        v-if="data?.asistencias?.length"
        :titulo="data?.asistenciaTitulo"
        :items="data.asistencias"
      />

    </template>
  </div>
</template>
