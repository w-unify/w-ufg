<script setup lang="ts">
interface Boton {
  texto: string
  enlace: string
  icono?: string
}

interface Unidad {
  parrafo: string
  botones: Boton[]
}

interface Props {
  titulo?: string
  items?: Unidad[]
}

withDefaults(defineProps<Props>(), {
  titulo: 'Unidades de Apoyo Investigativo',
  items: () => [],
})
</script>

<template>
  <section id="unidades-apoyo" class="py-16 xl:pb-20 xl:pt-0 bg-muted">
    <div class="container mx-auto max-w-[1000px] px-6">

      <div class="text-center mb-10 xl:mb-6">
        <h3 class="font-futura-bold text-dark text-3xl xl:text-4xl">{{ titulo }}</h3>
      </div>

      <div class="max-w-[850px] mx-auto">
        <div
          v-for="(unidad, i) in items"
          :key="i"
          class="pt-8 pb-8 border-b-2 border-primary/50 last:border-0 last:pb-0"
        >
          <div class="text-dark/80 mb-4 leading-relaxed" v-html="unidad.parrafo"></div>

          <div
            v-if="unidad.botones?.length"
            class="flex flex-row flex-wrap items-start justify-start gap-3 xl:gap-4"
          >
            <a
              v-for="(btn, j) in unidad.botones"
              :key="j"
              :href="btn.enlace"
              target="_blank"
              rel="noopener"
              class="btn-secondary btn-sm w-auto group inline-flex"
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
