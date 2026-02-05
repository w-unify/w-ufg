<script setup lang="ts">
interface Props {
  type?: string
}

defineProps<Props>()
</script>

<template>
  <div class="unknown-component">
    <p class="warning">⚠️ Unknown component type: <strong>{{ type }}</strong></p>
  </div>
</template>

<style scoped>
.unknown-component {
  padding: 2rem;
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  margin: 1rem 0;
}

.warning {
  color: #92400e;
  font-size: 1rem;
}
</style>
