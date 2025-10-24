<template>
  <div class="page">
    <h1>Student List</h1>

    <div class="controls">
      <input v-model="query" placeholder="Search by name..." />
      <router-link class="btn primary" to="/add-student">+ Add Student</router-link>
    </div>

    <table class="students-table" v-if="filtered.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in paginated" :key="s.id">
          <td>{{ s.name }}</td>
          <td>{{ className(s.class_id) }}</td>
          <td class="actions">
            <router-link :to="`/student/${s.id}`" class="btn">View</router-link>
            <button class="btn danger" @click="confirmDelete(s.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No students found.</p>

    <!-- simple pagination -->
    <div class="pager" v-if="pages > 1">
      <button :disabled="page === 1" @click="page--">Prev</button>
      <span>Page {{ page }} / {{ pages }}</span>
      <button :disabled="page === pages" @click="page++">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStudentStore } from '../stores/studentStore'
import { onMounted } from 'vue'

const store = useStudentStore()
const query = ref('')
const page = ref(1)
const pageSize = 8

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return store.students
  return store.students.filter(
    (s) => s.name && s.name.toLowerCase().includes(q)
  )
})

const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))

const paginated = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

function className(classId) {
  const c = store.getClassById(classId)
  return c ? c.name : '—'
}

function confirmDelete(id) {
  if (confirm('Are you sure? This cannot be undone.')) {
    store.deleteStudent(id)
    // adjust page if necessary
    if ((page.value - 1) * pageSize >= filtered.value.length && page.value > 1) {
      page.value--
    }
  }
}

onMounted(() => {
  // ensure page within bounds
  if (page.value > pages.value) page.value = pages.value
})
</script>

<style scoped>
.page { max-width: 900px; margin: 1.2rem auto; padding: 0 1rem; }
h1 { margin-bottom: 0.6rem; }
.controls { display:flex; gap:0.5rem; align-items:center; margin-bottom:0.8rem; }
.controls input { flex:1; padding:0.5rem; border:1px solid #ddd; border-radius:4px; }
.btn { padding:0.4rem 0.7rem; border:1px solid #bbb; background:#f5f5f5; border-radius:4px; text-decoration:none; color:#222; cursor:pointer; }
.btn.primary { background:#2f80ed; color:white; border-color:#2f80ed; }
.btn.danger { background:#ff4d4f; color:white; border-color:#ff4d4f; }
.students-table { width:100%; border-collapse:collapse; margin-top:0.6rem; }
.students-table th, .students-table td { padding:0.6rem; border:1px solid #eee; text-align:left; }
.actions { display:flex; gap:0.4rem; }
.pager { margin-top:0.8rem; display:flex; gap:0.8rem; align-items:center; }
</style>
