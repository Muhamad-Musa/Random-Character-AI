<template>
  <div class="dashboard">
    <h1>📊 Dashboard</h1>

    <!-- Overview Stats -->
    <div class="stats">
      <div class="stat-card">
        <h3>Total Students</h3>
        <p>{{ totalStudents }}</p>
      </div>

      <div class="stat-card">
        <h3>Total Classes</h3>
        <p>{{ totalClasses }}</p>
      </div>
    </div>

    <!-- Recent Students -->
    <div class="recent">
      <h2>🧑‍🎓 Recent Students</h2>
      <ul>
        <li v-for="student in recentStudents" :key="student.id">
          <strong>{{ student.name }}</strong> — {{ student.class }}
        </li>
      </ul>
    </div>

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <button @click="$router.push('/students')">View All Students</button>
      <button @click="$router.push('/add-student')">Add Student</button>
      <button @click="$router.push('/class-management')">Manage Classes</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStudentStore } from "../stores/studentStore"; // adjust if folder name is 'store'

const store = useStudentStore();

// Computed properties
const totalStudents = computed(() => store.students.length);
const totalClasses = computed(() => store.classes?.length || 0);
const recentStudents = computed(() =>
  store.students.slice(-5).reverse()
);
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  flex: 1;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.recent {
  margin-top: 20px;
}

.recent ul {
  list-style: none;
  padding: 0;
}

.recent li {
  background: #f1f1f1;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 8px;
}

.nav-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  background: #0078d4;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #005fa3;
}
</style>
