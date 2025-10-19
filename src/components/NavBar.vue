<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/projects">Projects</router-link></li>
      <li><router-link to="/board">Board</router-link></li>
      <li><router-link to="/calendar">Calendar</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}
</style>
