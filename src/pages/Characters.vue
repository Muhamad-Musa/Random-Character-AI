<template>
  <div class="characters-page">
    <h1>Your Generated Characters</h1>
    <div class="characters-grid">
      <div v-for="character in savedCharacters" 
           :key="character.id" 
           class="character-card">
        <h3>{{ character.name }}</h3>
        <p><strong>Age:</strong> {{ character.age }}</p>
        <p><strong>Hobby:</strong> {{ character.hobby }}</p>
        <p><strong>Quirky Fact:</strong> {{ character.quirkyFact }}</p>
        <p>{{ character.description }}</p>
        <router-link :to="'/chat'" class="chat-btn">
          Chat with Character
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const savedCharacters = ref([
  {
    id: 1,
    name: 'Luna Starling',
    age: 28,
    hobby: 'Extreme origami',
    quirkyFact: 'Can recite pi to 100 digits',
    description: 'A delightfully eccentric individual who lives life by their own unique rules.'
  },
  {
    id: 2,
    name: 'Atlas Dreamforge',
    age: 35,
    hobby: 'Professional sock puppet making',
    quirkyFact: 'Only walks backwards on Thursdays',
    description: 'An imaginative soul with a penchant for the extraordinary.'
  }
])
</script>

<style scoped>
.characters-page {
  padding: 2rem;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.character-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chat-btn {
  display: inline-block;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.chat-btn:hover {
  background: #45a049;
}
</style>