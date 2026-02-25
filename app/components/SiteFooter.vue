<script setup lang="ts">
import { computed } from 'vue'
import type { FooterData } from '~/types/squidex'
import { useSquidexContent, resolveSquidexField } from '~/composables/useSquidexContent'

// Cargar datos del footer desde Squidex
const { content: footerContent } = useSquidexContent<FooterData>('footer', { $top: 1 })
const footer = computed(() => footerContent.value?.[0]?.data ?? null)

const nombreSede = computed(() => resolveSquidexField<string>(footer.value?.nombreSede, 'es') || 'SEDE SAN SALVADOR')
const direccionSede = computed(() => resolveSquidexField<string>(footer.value?.direccionSede, 'es') || 'Edificio de Rectoría, Calle El Progreso n.° 2748, San Salvador, El Salvador, C.A.')
const telefonoSede = computed(() => resolveSquidexField<string>(footer.value?.telefonoSede, 'es') || '2209-2834')
const emailSede = computed(() => resolveSquidexField<string>(footer.value?.emailSede, 'es') || 'admisiones@ufg.edu.sv')

const linkInstagram = computed(() => resolveSquidexField<string>(footer.value?.linkInstagram, 'es') || '#')
const linkFacebook = computed(() => resolveSquidexField<string>(footer.value?.linkFacebook, 'es') || '#')
const linkX = computed(() => resolveSquidexField<string>(footer.value?.linkX, 'es') || '#')
const linkLinkedin = computed(() => resolveSquidexField<string>(footer.value?.linkLinkedin, 'es') || '#')
const linkYoutube = computed(() => resolveSquidexField<string>(footer.value?.linkYoutube, 'es') || '#')
</script>

<template>
  <footer class="bg-white pt-16 pb-8">
    <div class="container mx-auto max-w-[1400px] px-6">

      <!-- CTA -->
      <div class="flex flex-col xl:flex-row items-center justify-between gap-8 mb-16 xl:mb-16">
        <div class="text-center xl:text-left">
          <h4 class="font-futura-bold text-[32px] xl:text-[45px] leading-[1.1] text-dark mb-4 fade">
            Educación local con Impacto Global<br>
            ¡Inscríbete!
          </h4>
          <p class="text-dark/80 text-sm xl:text-base max-w-[550px] fade">
            Tu futuro global comienza en la UFG, única universidad en El Salvador potenciada por Arizona State University.
          </p>
        </div>
        <NuxtLink to="/aplicar" class="btn-primary btn-lg group relative pulse">
          <span>APLICAR</span>
          <div class="btn-circle"></div>
        </NuxtLink>
      </div>

      <!-- Row 1 -->
      <hr class="border-gray-100 mb-12">
      <div class="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-5 xl:gap-12 pb-5 xl:pb-16">
        <div class="space-y-6 border-b border-gray-100 xl:border-0 pb-8 xl:pb-0">
          <p class="font-futura-bold text-dark/80 text-sm xl:text-base uppercase tracking-widest mb-4">{{ nombreSede }}</p>
          <div class="flex flex-col items-start gap-4">
            <div class="flex items-start gap-3 text-dark/80 text-sm xl:text-base max-w-[360px]">
              <img src="/img/globals/location.svg" alt="Ubicación" class="w-5 h-5 mt-1 shrink-0">
              <span>{{ direccionSede }}</span>
            </div>
            <div class="flex items-center gap-3 text-dark/80 text-sm xl:text-base">
              <img src="/img/globals/phone.svg" alt="Teléfono" class="w-5 h-5 shrink-0">
              <a :href="`tel:+503${telefonoSede.replace(/[^0-9]/g, '')}`" class="hover:text-accent transition-colors">Tel: {{ telefonoSede }}</a>
            </div>
            <div class="flex items-center gap-3 text-dark/80 text-sm xl:text-base">
              <img src="/img/globals/email.svg" alt="Email" class="w-5 h-5 shrink-0">
              <a :href="`mailto:${emailSede}`" class="hover:text-accent transition-colors">{{ emailSede }}</a>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-5 xl:gap-8 xl:gap-12">
          <img src="/img/globals/footer-logo-cda.webp" alt="CdA" class="h-[100px] xl:h-40 w-auto transition-all">
          <img src="/img/globals/footer-logo-hceres.webp" alt="HcÉres" class="h-[100px] xl:h-40 w-auto transition-all">
          <img src="/img/globals/footer-logo-qs.webp" alt="QS Stars" class="h-[100px] xl:h-40 w-auto transition-all">
        </div>
      </div>

      <!-- Row 2 -->
      <div class="flex flex-col xl:flex-row items-center justify-between gap-8 border-t border-gray-100 pt-10">
        <div class="flex items-center gap-5">
          <a :href="linkInstagram" target="_blank" rel="noopener" class="hover:scale-110 transition-transform"><img src="/img/globals/rs-instagram.webp" alt="Instagram" class="w-6 h-6 xl:w-9 xl:h-9"></a>
          <a :href="linkFacebook" target="_blank" rel="noopener" class="hover:scale-110 transition-transform"><img src="/img/globals/rs-facebook.webp" alt="Facebook" class="w-6 h-6 xl:w-8 xl:h-8"></a>
          <a :href="linkX" target="_blank" rel="noopener" class="hover:scale-110 transition-transform"><img src="/img/globals/rs-x.webp" alt="X" class="w-5 h-5 xl:w-8 xl:h-8"></a>
          <a :href="linkLinkedin" target="_blank" rel="noopener" class="hover:scale-110 transition-transform"><img src="/img/globals/rs-linkedin.webp" alt="LinkedIn" class="w-6 h-6 xl:w-9 xl:h-9"></a>
          <a :href="linkYoutube" target="_blank" rel="noopener" class="hover:scale-110 transition-transform"><img src="/img/globals/rs-youtube.webp" alt="YouTube" class="w-6 h-6 xl:w-9 xl:h-9"></a>
          <a href="#" class="hover:scale-110 transition-transform"><img src="/img/globals/radio.webp" alt="Radio" class="w-6 h-6 xl:w-8 xl:h-8"></a>
        </div>
        <nav class="flex flex-wrap justify-center gap-5 xl:gap-10 text-dark font-futura-bold text-xs xl:text-base tracking-wide">
          <NuxtLink to="/institucion" class="hover:text-accent transition-colors">Sobre la Universidad</NuxtLink>
          <NuxtLink to="/investigacion" class="hover:text-accent transition-colors">Investigación</NuxtLink>
          <NuxtLink to="/rsu" class="hover:text-accent transition-colors">RSU</NuxtLink>
          <NuxtLink to="/blog" class="hover:text-accent transition-colors">Blog</NuxtLink>
        </nav>
        <div class="xl:order-last">
          <NuxtLink to="/">
            <img src="/img/globals/logo-ufg-black.svg" alt="UFG Logo" class="h-10 xl:h-12 w-auto">
          </NuxtLink>
        </div>
      </div>

      <!-- Row 3 -->
      <div class="border-t border-gray-100 mt-12 pt-8">
        <div class="flex flex-col xl:flex-row items-center justify-between gap-2 xl:gap-4">
          <div class="order-1 xl:order-2">
            <p class="text-[13px] xl:text-[14px] text-gray-500 text-center">NIT: 0614-070381-003-2</p>
          </div>
          <div class="order-2 xl:order-3">
            <NuxtLink to="/politica-de-privacidad" class="text-[13px] xl:text-[14px] text-gray-500 underline hover:text-accent transition-colors">Política de privacidad</NuxtLink>
          </div>
          <div class="order-3 xl:order-1">
            <p class="text-[13px] xl:text-[14px] text-gray-500 text-center xl:text-left">&copy; Copyright 2026, Todos Los Derechos Reservados.</p>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>
