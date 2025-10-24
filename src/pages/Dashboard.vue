<template>
  <div class="dashboard">
    <h1>📊 Dashboard</h1>

    <!-- Overview Stats -->
    <div class="stats">
      <div class="stat-card">
        <h3>Total Students</h3>
        <p class="stat-number">{{ totalStudents }}</p>
      </div>

      <div class="stat-card">
        <h3>Total Classes</h3>
        <p class="stat-number">{{ totalClasses }}</p>
      </div>
    </div>

    <!-- Recent Students -->
    <div class="recent">
      <h2>🧑‍🎓 Recent Students</h2>
      <div v-if="recentStudents.length > 0">
        <table class="recent-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in recentStudents" :key="student.id">
              <td>{{ student.name }}</td>
              <td>{{ className(student.class_id) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>No students yet</div>
    </div>

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <router-link to="/students" class="nav-btn">👥 View All Students</router-link>
      <router-link to="/add-student" class="nav-btn">➕ Add Student</router-link>
      <router-link to="/class-management" class="nav-btn">🏫 Manage Classes</router-link>
      <router-link to="/assign-courses" class="nav-btn">📘 Assign Courses</router-link>
      <router-link to="/attendance" class="nav-btn">📅 Attendance</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStudentStore } from "../stores/studentStore";

const store = useStudentStore();

// Computed properties
const totalStudents = computed(() => store.totalStudents);
const totalClasses = computed(() => store.totalClasses);
const recentStudents = computed(() => {
  // Get last 5 students (most recent first)
  return store.students.slice(-5).reverse();
});

function className(classId) {
  const c = store.getClassById(classId);
  return c ? c.name : "—";
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

h1 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.recent {
  margin-top: 30px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.recent h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.recent-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.recent-table th,
.recent-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.recent-table th {
  background: #f0f0f0;
  font-weight: bold;
}

.nav-buttons {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.nav-btn {
  display: block;
  background: #2f80ed;
  color: white;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-btn:hover {
  background: #2563be;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
