<script setup lang="ts">
useScrollAnimations()

useHead({
  title: 'Admisiones - UFG',
  meta: [
    { name: 'description', content: 'Forma parte de la UFG Powered By ASU. Conoce los requisitos de admisión para pregrado, doble titulación y postgrado.' },
    { name: 'keywords', content: 'requisitos ufg, admisiones UFG, ciclos ufg, reingreso ufg, nuevo ingreso ufg, ingreso por equivalencias ufg' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Title -->
    <section class="relative pt-[30px] xl:pt-[40px] pb-[35px] xl:pb-[40px]">
      <div class="container mx-auto max-w-[1400px] px-5">
        <h1 class="heading-1 reveal">Admisiones</h1>
      </div>
    </section>

    <!-- Pasos de Solicitud de Admisión -->
    <AdmisionesPasosAdmision />

    <!-- Requisitos de Admisión de Pregrado -->
    <AdmisionesRequisitosPregrado />

    <!-- Prueba de Orientación Vocacional -->
    <AdmisionesPruebaVocacional />

    <!-- Doble Titulación (video + requisitos + costos) -->
    <AdmisionesDobleTitulacion />

    <!-- Beneficios UFG+ASU -->
    <AdmisionesBeneficiosASU />

    <!-- Requisitos de Admisión de Postgrado -->
    <AdmisionesRequisitosPostgrado />
  </div>
</template>
