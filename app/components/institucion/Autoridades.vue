<script setup lang="ts">
interface TabItem {
  titulo: string
  contenido: string
}

interface Tab {
  id: string
  label: string
  items: TabItem[]
}

interface Props {
  tabs?: Tab[]
  btnTexto?: string
  btnUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  btnTexto: '',
  btnUrl: '#',
})

const activeTab = ref(0)
</script>

<template>
  <section class="py-16 xl:py-24 bg-muted">
    <div class="container mx-auto max-w-[1200px] px-6">

      <div v-if="tabs?.length" class="flex flex-col xl:flex-row gap-5 xl:gap-4">

        <!-- Tabs Nav -->
        <div class="w-full xl:w-[300px] shrink-0">
          <div class="relative xl:sticky xl:top-[130px]">

            <!-- Mobile: scroll horizontal -->
            <div class="flex xl:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide px-10">
              <button
                v-for="(tab, i) in tabs"
                :key="tab.id"
                class="shrink-0 tab-btn"
                :class="activeTab === i ? 'active' : ''"
                @click="activeTab = i"
              >
                <span class="text-[18px] p-2 whitespace-nowrap">{{ tab.label }}</span>
              </button>
            </div>

            <!-- Desktop: vertical list -->
            <div class="hidden xl:flex xl:flex-col xl:gap-4">
              <button
                v-for="(tab, i) in tabs"
                :key="tab.id"
                class="tab-btn w-full"
                :class="activeTab === i ? 'active' : ''"
                @click="activeTab = i"
              >
                <span class="text-base p-0">{{ tab.label }}</span>
                <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        <!-- Tab Content -->
        <div class="grow">
          <div v-for="(tab, i) in tabs" :key="tab.id" v-show="activeTab === i">
            <div class="space-y-4">
              <div v-for="(item, j) in tab.items" :key="j" class="step-card">
                <div class="step-body">
                  <h3 class="font-futura-bold text-2xl pb-2">{{ item.titulo }}</h3>
                  <div class="prose max-w-none text-dark" v-html="item.contenido"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Botón descarga -->
      <div v-if="btnTexto" class="mt-12 xl:mt-16 text-center fade reveal">
        <a
          :href="btnUrl"
          target="_blank"
          rel="noopener"
          class="btn-secondary btn-nm group inline-flex"
        >
          <span>{{ btnTexto }}</span>
          <div class="btn-circle"></div>
        </a>
      </div>

    </div>
  </section>
</template>
