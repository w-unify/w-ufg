<script setup lang="ts">
interface Card {
  title: string
  description: string
  image?: string
}

interface Props {
  title?: string
  cards?: Card[]
}

defineProps<Props>()
</script>

<template>
  <section class="card-grid-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div v-if="cards && cards.length" class="card-grid">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img v-if="card.image" :src="card.image" :alt="card.title" class="card-image" />
        <div class="card-content">
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-grid-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a202c;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.card-description {
  color: #718096;
  line-height: 1.6;
}
</style>
