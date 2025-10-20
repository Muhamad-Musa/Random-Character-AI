// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import StudentList from '../pages/StudentList.vue'
import AddStudent from '../pages/AddStudent.vue'
import StudentDetails from '../pages/StudentDetails.vue'
// optionally add assign page later

const routes = [
  { path: '/', redirect: '/students' },
  { path: '/students', component: StudentList },
  { path: '/add-student', component: AddStudent },
  { path: '/students/:id', component: StudentDetails, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
