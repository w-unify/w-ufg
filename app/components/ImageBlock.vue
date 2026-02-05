<script setup lang="ts">
interface Props {
  imageUrl?: string
  alt?: string
  caption?: string
}

defineProps<Props>()
</script>

<template>
  <section class="image-block">
    <div v-if="imageUrl" class="image-container">
      <img :src="imageUrl" :alt="alt || 'Image'" class="image" />
      <p v-if="caption" class="caption">{{ caption }}</p>
    </div>
  </section>
</template>

<style scoped>
.image-block {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.image-container {
  width: 100%;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.caption {
  margin-top: 1rem;
  text-align: center;
  color: #718096;
  font-style: italic;
}
</style>
