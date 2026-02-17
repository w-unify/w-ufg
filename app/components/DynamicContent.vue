<script setup lang="ts">
import type { SquidexComponentData } from '~/types/squidex'
import { resolveSquidexField } from '~/composables/useSquidexContent'

interface Props {
  components: SquidexComponentData[]
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'iv'
})

const componentMap: Record<string, any> = {
  // Home
  HomeHeroHome: resolveComponent('HomeHeroHome'),
  HomeIntroSection: resolveComponent('HomeIntroSection'),
  HomeAccessCards: resolveComponent('HomeAccessCards'),
  HomeAboutSection: resolveComponent('HomeAboutSection'),
  HomeStatsCounter: resolveComponent('HomeStatsCounter'),
  HomeAllianceSection: resolveComponent('HomeAllianceSection'),
  HomeAccreditationsSection: resolveComponent('HomeAccreditationsSection'),
  // Carrera
  CarreraCareerHero: resolveComponent('CarreraCareerHero'),
  CarreraDiscoverCareer: resolveComponent('CarreraDiscoverCareer'),
  CarreraDualDegreeSection: resolveComponent('CarreraDualDegreeSection'),
  CarreraAdmissionCards: resolveComponent('CarreraAdmissionCards'),
  CarreraSemesterCost: resolveComponent('CarreraSemesterCost'),
  CarreraScholarshipsAccordion: resolveComponent('CarreraScholarshipsAccordion')
}

function getComponent(type: string) {
  const comp = componentMap[type]
  if (!comp) {
    console.warn(`[DynamicContent] Unknown component type: "${type}"`)
  }
  return comp || 'div'
}

function resolveComponentData(component: SquidexComponentData) {
  const resolved: Record<string, any> = {
    type: component.type
  }
  
  for (const key in component) {
    if (key !== 'type') {
      resolved[key] = resolveSquidexField(component[key], props.language)
    }
  }
  
  return resolved
}
</script>

<template>
  <div class="w-full">
    <component
      v-for="(comp, index) in components"
      :key="`component-${index}-${comp.type}`"
      :is="getComponent(comp.type)"
      v-bind="resolveComponentData(comp)"
    />
  </div>
</template>
