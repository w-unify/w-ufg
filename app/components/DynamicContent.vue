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
  HeroSection: resolveComponent('HeroSection'),
  TextBlock: resolveComponent('TextBlock'),
  ImageBlock: resolveComponent('ImageBlock'),
  CardGrid: resolveComponent('CardGrid')
}

function getComponent(type: string) {
  return componentMap[type] || resolveComponent('UnknownComponent')
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
  <div class="dynamic-content">
    <component
      v-for="(comp, index) in components"
      :key="`component-${index}-${comp.type}`"
      :is="getComponent(comp.type)"
      v-bind="resolveComponentData(comp)"
    />
  </div>
</template>

<style scoped>
.dynamic-content {
  width: 100%;
}
</style>
