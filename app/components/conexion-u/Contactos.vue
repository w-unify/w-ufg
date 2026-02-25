<script setup lang="ts">
interface Boton {
  texto: string
  enlace: string
  icono?: string
}

interface Contacto {
  parrafo: string
  imagen: string
  nombre: string
  cargo: string
  botones: Boton[]
}

interface Props {
  contactos?: Contacto[]
}

withDefaults(defineProps<Props>(), {
  contactos: () => [],
})
</script>

<template>
  <section id="asesorias" class="pt-20 pb-10 xl:pt-24 xl:pb-8 bg-white">
    <div class="container mx-auto px-6">

      <template v-for="(contacto, i) in contactos" :key="i">
        <div class="text-center mb-12 xl:mb-10" :class="i > 0 ? 'pt-16 xl:pt-20' : ''">
          <h4 class="font-futura-bold text-dark text-xl xl:text-2xl mb-2 reveal">{{ contacto.nombre }}</h4>
          <p class="text-dark/80 max-w-[800px] mx-auto reveal delay-100">{{ contacto.parrafo }}</p>
        </div>

        <div class="max-w-[850px] mx-auto border border-primary rounded-big p-5 xl:py-5 xl:pl-8 xl:pr-8 reveal delay-200">
          <div class="divide-y divide-gray-200">
            <article class="flex flex-col xl:flex-row items-center justify-between py-8 xl:py-5 first:pt-0 last:pb-2 gap-2 xl:gap-6">
              <div class="flex flex-col xl:flex-row items-center gap-2 xl:gap-5 text-center xl:text-left">
                <div class="w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden border-4 border-gray-100 shrink-0">
                  <img
                    v-if="contacto.imagen"
                    :src="contacto.imagen"
                    class="w-full h-full object-cover"
                    :alt="contacto.nombre"
                  >
                  <div v-else class="w-full h-full bg-primary/10 flex items-center justify-center">
                    <svg class="w-8 h-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="font-futura-bold text-xl">{{ contacto.nombre }}</h3>
                  <p class="text-dark/60">{{ contacto.cargo }}</p>
                </div>
              </div>

              <div class="flex flex-row flex-wrap items-center justify-center xl:items-start xl:justify-start gap-3 xl:gap-4">
                <a
                  v-for="(btn, j) in contacto.botones"
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
            </article>
          </div>
        </div>
      </template>

    </div>
  </section>
</template>
