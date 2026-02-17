<script setup lang="ts">
useScrollAnimations()

const route = useRoute()
const slug = computed(() => route.params.slug as string)

useHead({
  title: `Ingeniería en Ciencia de Datos - UFG`,
  meta: [
    { name: 'description', content: 'Detalle de carrera - Universidad Francisco Gavidia' }
  ]
})

// TODO: Cuando Squidex esté configurado, reemplazar datos estáticos por:
// const { content, error, pending } = useSquidexContent<CareerContent['data']>('careers', {
//   $filter: `data/slug/iv eq '${slug.value}'`,
//   $top: 1
// })
</script>

<template>
  <div>
    <CarreraCareerHero />
    <CarreraDiscoverCareer />
    <CarreraDualDegreeSection />
    <CarreraAdmissionCards />
    <CarreraSemesterCost />
    <CarreraScholarshipsAccordion />
  </div>
</template>
