<script setup lang="ts">
interface Props {
  titulo?: string
  parrafo?: string
  btnTexto?: string
  btnUrl?: string
}

withDefaults(defineProps<Props>(), {
  titulo: 'Smart U',
  parrafo: '',
  btnTexto: 'APLICAR',
  btnUrl: '#',
})
</script>

<template>
  <section id="reinscripcion" class="py-16 xl:py-24 bg-muted">
    <div class="container mx-auto px-6 text-center">
      <div
        class="max-w-[900px] mx-auto mb-10 prose prose-lg"
        v-html="parrafo"
      ></div>

      <div class="flex justify-center fade delay-400">
        <a
          :href="btnUrl"
          target="_blank"
          rel="noopener"
          class="btn-header group btn-sm xl:btn-lg inline-flex"
        >
          <span>{{ btnTexto }}</span>
          <div class="btn-circle"></div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(p.heading-2) {
  font-size: 1.125rem;
  line-height: 1.5rem;
}

@media (min-width: 1280px) {
  :deep(p.heading-2) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
</style>
