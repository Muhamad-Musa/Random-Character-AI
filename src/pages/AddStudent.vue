<!-- src/pages/AddStudent.vue -->
<template>
  <div class="page">
    <h1>Add Student</h1>

    <form @submit.prevent="onSubmit" @reset.prevent="onReset" class="form">
      <label>
        Name *
        <input v-model="form.name" type="text" />
        <small v-if="errors.name" class="error">{{ errors.name }}</small>
      </label>

      <label>
        Age
        <input v-model.number="form.age" type="number" min="1" />
      </label>

      <label>
        Class
        <select v-model.number="form.classId">
          <option :value="null">-- Select class --</option>
          <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </label>

      <label>
        Email *
        <input v-model="form.email" type="email" />
        <small v-if="errors.email" class="error">{{ errors.email }}</small>
      </label>

      <label>
        Courses (optional)
        <div class="courses-list">
          <label v-for="c in courses" :key="c.id">
            <input type="checkbox" :value="c.id" v-model="form.courses" /> {{ c.name }}
          </label>
        </div>
      </label>

      <div class="form-actions">
        <button class="btn primary" type="submit">Submit</button>
        <button class="btn" type="reset">Reset</button>
        <router-link class="btn" to="/students">Back</router-link>
      </div>
    </form>

    <div v-if="saved" class="notice">Student created: {{ createdName }} — <router-link :to="`/students/${createdId}`">View</router-link></div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStudentStore } from '../stores/studentStore'
import { useRouter } from 'vue-router'

const store = useStudentStore()
const router = useRouter()

const form = reactive({
  name: '',
  age: null,
  classId: null,
  email: '',
  courses: []
})

const errors = reactive({ name: '', email: '' })
const saved = ref(false)
const createdId = ref(null)
const createdName = ref('')

function validate() {
  errors.name = ''
  errors.email = ''
  let ok = true
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    ok = false
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    ok = false
  } else {
    // simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(form.email)) {
      errors.email = 'Enter a valid email'
      ok = false
    }
  }
  return ok
}

function onSubmit() {
  if (!validate()) return
  const student = store.addStudent({
    name: form.name.trim(),
    age: form.age ? Number(form.age) : null,
    classId: form.classId || null,
    email: form.email.trim(),
    courses: form.courses || []
  })
  saved.value = true
  createdId.value = student.id
  createdName.value = student.name
  // reset form
  form.name = ''
  form.age = null
  form.classId = null
  form.email = ''
  form.courses = []
  // Option: navigate to details page automatically
  // router.push(`/students/${createdId.value}`)
}

function onReset() {
  form.name = ''
  form.age = null
  form.classId = null
  form.email = ''
  form.courses = []
  errors.name = ''
  errors.email = ''
  saved.value = false
}
</script>

<style scoped>
.page { max-width:700px; margin:1.2rem auto; padding:0 1rem; }
.form { display:flex; flex-direction:column; gap:0.6rem; }
label { display:flex; flex-direction:column; font-size:0.95rem; }
input[type="text"], input[type="email"], input[type="number"], select { padding:0.45rem; border:1px solid #ddd; border-radius:4px; }
.courses-list { display:flex; gap:0.6rem; flex-wrap:wrap; margin-top:0.4rem; }
.form-actions { display:flex; gap:0.6rem; margin-top:0.6rem; }
.error { color:#c0392b; font-size:0.85rem; }
.notice { margin-top:0.8rem; padding:0.6rem; background:#ecf9f1; border:1px solid #bfe9cf; border-radius:4px; }
.btn { padding:0.45rem 0.7rem; border:1px solid #bbb; background:#f5f5f5; border-radius:4px; cursor:pointer; text-decoration:none; color:#222; }
.btn.primary { background:#2f80ed; color:white; border-color:#2f80ed; }
</style>
