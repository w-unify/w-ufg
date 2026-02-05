<script setup lang="ts">
interface Props {
  title?: string
  content?: string
}

defineProps<Props>()
</script>

<template>
  <section class="text-block">
    <h2 v-if="title" class="text-block-title">{{ title }}</h2>
    <div v-if="content" class="text-block-content" v-html="content"></div>
  </section>
</template>

<style scoped>
.text-block {
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.text-block-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1a202c;
}

.text-block-content {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #4a5568;
}
</style>
