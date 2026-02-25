<script setup lang="ts">
interface Props {
  titulo?: string
  imagenes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Galería',
  imagenes: () => [],
})

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(i: number) {
  lightboxIndex.value = i
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function prevImage() {
  lightboxIndex.value = (lightboxIndex.value - 1 + props.imagenes.length) % props.imagenes.length
}

function nextImage() {
  lightboxIndex.value = (lightboxIndex.value + 1) % props.imagenes.length
}

function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section id="galeria" class="py-16 xl:py-24 bg-white">
    <div class="container mx-auto px-6">
      <h2 class="heading-2 text-center mb-12 xl:mb-16 reveal">{{ titulo }}</h2>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 max-w-[1200px] mx-auto">
        <button
          v-for="(img, i) in imagenes"
          :key="i"
          class="group relative block overflow-hidden rounded-[20px] aspect-square bg-gray-100"
          @click="openLightbox(i)"
        >
          <img
            :src="img"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt=""
          >
          <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          @click="closeLightbox"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <button
          class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          @click="prevImage"
        >
          <svg class="w-8 h-8 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <img
          :src="imagenes[lightboxIndex]"
          class="max-w-full max-h-[85vh] object-contain rounded-xl"
          alt=""
        >

        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          @click="nextImage"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <div class="absolute bottom-4 text-white text-sm">
          {{ lightboxIndex + 1 }} / {{ imagenes.length }}
        </div>
      </div>
    </Teleport>
  </section>
</template>
