<!-- src/pages/StudentDetails.vue -->
<template>
  <div class="page" v-if="student">
    <h1>Student Details</h1>

    <div class="card">
      <div class="row"><strong>Name:</strong> <span>{{ student.name }}</span></div>
      <div class="row"><strong>Age:</strong> <span>{{ student.age ?? '—' }}</span></div>
      <div class="row"><strong>Class:</strong> <span>{{ className(student.classId) }}</span></div>
      <div class="row"><strong>Email:</strong> <span>{{ student.email }}</span></div>
      <div class="row">
        <strong>Assigned Courses:</strong>
        <div v-if="studentCourses.length">
          <ul>
            <li v-for="c in studentCourses" :key="c.id">{{ c.name }}</li>
          </ul>
        </div>
        <div v-else>— No courses assigned</div>
      </div>

      <div class="actions">
        <router-link class="btn" to="/students">Back</router-link>
        <router-link :to="`/assign-courses/${student.id}`" class="btn">Assign Courses</router-link>
        <button class="btn danger" @click="deleteStudent">Delete Student</button>
      </div>
    </div>
  </div>

  <div v-else class="page">
    <p>Student not found.</p>
    <router-link to="/students" class="btn">Back to list</router-link>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStudentStore } from '../stores/studentStore'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useStudentStore()
const id = route.params.id
const student = store.getStudentById(id)

const studentCourses = computed(() => {
  if (!student) return []
  return store.courses.filter((c) => student.courses.includes(c.id))
})

function className(classId) {
  const c = store.classes.find((x) => x.id === classId)
  return c ? c.name : '—'
}

function deleteStudent() {
  if (!confirm('Delete this student?')) return
  store.deleteStudent(student.id)
  router.push('/students')
}
</script>

<style scoped>
.page { max-width:700px; margin:1.2rem auto; padding:0 1rem; }
.card { border:1px solid #eee; padding:1rem; border-radius:6px; background:#fff; }
.row { display:flex; gap:0.8rem; margin-bottom:0.5rem; }
.actions { margin-top:0.8rem; display:flex; gap:0.6rem; }
.btn { padding:0.45rem 0.7rem; border:1px solid #bbb; background:#f5f5f5; border-radius:4px; text-decoration:none; color:#222; cursor:pointer; }
.btn.danger { background:#ff4d4f; color:white; border-color:#ff4d4f; }
</style>
