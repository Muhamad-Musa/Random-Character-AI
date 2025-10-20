<template>
  <div class="home">
    <h1>Random Character Generator</h1>
    <div class="character-card" v-if="character">
      <h2>{{ character.name }}</h2>
      <p>Age: {{ character.age }}</p>
      <p>Hobby: {{ character.hobby }}</p>
      <p>Quirky Fact: {{ character.quirkyFact }}</p>
      <p>{{ character.description }}</p>
    </div>
    <button @click="generateCharacter" class="generate-btn">Generate Character</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const character = ref(null)
const hobbies = ['Collecting vintage calculators', 'Extreme origami', 'Professional sock puppet making', 'Cloud watching']
const quirkyFacts = ['Can recite pi to 100 digits', 'Only walks backwards on Thursdays', 'Speaks to plants in French', 'Collects dust bunnies']

function generateCharacter() {
  character.value = {
    name: getRandomName(),
    age: Math.floor(Math.random() * 50) + 20,
    hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
    quirkyFact: quirkyFacts[Math.floor(Math.random() * quirkyFacts.length)],
    description: 'A delightfully eccentric individual who lives life by their own unique rules.'
  }
}

function getRandomName() {
  const firstNames = ['Luna', 'Zephyr', 'Sage', 'Atlas', 'Nova', 'Echo']
  const lastNames = ['Starling', 'Moonweaver', 'Windwhisper', 'Dreamforge', 'Stormborn']
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

.character-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.generate-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
}

.generate-btn:hover {
  background-color: #45a049;
}
</style>
