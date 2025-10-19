<template>
  <div class="layout">
    <Header />
    <NavBar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import NavBar from '../components/NavBar.vue'
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
  padding: 1rem;
}
</style>
