<template>
  <div class="page">
    <h1>Add Student</h1>

    <form @submit.prevent="onSubmit" @reset.prevent="onReset" class="form">
      <label>
        Name *
        <input v-model="form.name" type="text" required />
        <small v-if="errors.name" class="error">{{ errors.name }}</small>
      </label>

      <label>
        Age *
        <input v-model.number="form.age" type="number" min="1" required />
      </label>

      <label>
        Stage *
        <select v-model.number="form.stage_id" required>
          <option value="">-- Select stage --</option>
          <option v-for="s in store.stages" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </label>

      <label>
        Email *
        <input v-model="form.email" type="email" required />
        <small v-if="errors.email" class="error">{{ errors.email }}</small>
      </label>

      <div class="form-actions">
        <button class="btn primary" type="submit">Submit</button>
        <button class="btn" type="reset">Reset</button>
        <router-link class="btn" to="/students">Back</router-link>
      </div>
    </form>

    <div v-if="saved" class="notice success">✅ Student created: {{ createdName }} — <router-link :to="`/student/${createdId}`">View</router-link></div>
    <div v-if="errorMessage" class="notice error">❌ {{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStudentStore } from '../stores/studentStore'

const store = useStudentStore()

const form = reactive({
  name: '',
  age: null,
  stage_id: '',
  email: '',
})

const errors = reactive({ name: '', email: '' })
const saved = ref(false)
const errorMessage = ref('')
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
  if (!form.age) {
    errors.age = 'Age is required'
    ok = false
  }
  return ok
}

function onSubmit() {
  errorMessage.value = ''
  if (!validate()) return
  try {
    const student = store.addStudent({
      name: form.name.trim(),
      age: Number(form.age),
      stage_id: form.stage_id,
      email: form.email.trim(),
    })
    saved.value = true
    createdId.value = student.id
    createdName.value = student.name
    // reset form
    form.name = ''
    form.age = null
    form.stage_id = ''
    form.email = ''
  } catch (err) {
    errorMessage.value = 'Failed to create student'
  }
}

function onReset() {
  form.name = ''
  form.age = null
  form.stage_id = ''
  form.email = ''
  errors.name = ''
  errors.email = ''
  saved.value = false
  errorMessage.value = ''
}
</script>

<style scoped>
.page { max-width:700px; margin:1.2rem auto; padding:0 1rem; }
.form { display:flex; flex-direction:column; gap:0.6rem; }
label { display:flex; flex-direction:column; font-size:0.95rem; font-weight: bold; }
input[type="text"], input[type="email"], input[type="number"], select { padding:0.45rem; border:1px solid #ddd; border-radius:4px; margin-top: 0.2rem; }
.form-actions { display:flex; gap:0.6rem; margin-top:0.6rem; }
.error { color:#c0392b; font-size:0.85rem; margin-top: 0.2rem; }
.notice { margin-top:0.8rem; padding:0.6rem; border-radius:4px; }
.notice.success { background:#ecf9f1; border:1px solid #bfe9cf; color: #27ae60; }
.notice.error { background:#fdeaea; border:1px solid #f5b7b1; color: #c0392b; }
.btn { padding:0.45rem 0.7rem; border:1px solid #bbb; background:#f5f5f5; border-radius:4px; cursor:pointer; text-decoration:none; color:#222; }
.btn.primary { background:#2f80ed; color:white; border-color:#2f80ed; }
</style>
