<template>
  <div class="home">
    <h1>Random Character AI</h1>
    <p>Click generate to create a new character.</p>
    <div class="character-card" v-if="character">
      <h2>{{ character.name }}</h2>
      <p>Age: {{ character.age }}</p>
      <p>Hobby: {{ character.hobby }}</p>
      <p>Quirky Fact: {{ character.quirkyFact }}</p>
    </div>
    <div class="controls">
      <button @click="generateCharacter" class="generate-btn">Generate Character</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const character = ref(null)

function generateCharacter() {
  const firstNames = ['Luna', 'Zephyr', 'Sage', 'Atlas', 'Nova', 'Echo']
  const lastNames = ['Starling', 'Moonweaver', 'Windwhisper', 'Dreamforge', 'Stormborn']
  const hobbies = ['Collecting vintage calculators', 'Extreme origami', 'Professional sock puppet making', 'Cloud watching']
  const quirkyFacts = ['Can recite pi to 100 digits', 'Only walks backwards on Thursdays', 'Speaks to plants in French', 'Collects dust bunnies']

  character.value = {
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    age: Math.floor(Math.random() * 50) + 18,
    hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
    quirkyFact: quirkyFacts[Math.floor(Math.random() * quirkyFacts.length)]
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
}
.character-card {
  background: #fff;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  margin: 1rem 0;
}
.controls {
  margin-top: 1rem;
}
.generate-btn {
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: #2f80ed;
  color: white;
}
</style>
