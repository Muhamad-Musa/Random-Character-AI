import { createRouter, createWebHistory } from 'vue-router'

// Import all pages
import Dashboard from '../pages/Dashboard.vue'
import StudentList from '../pages/StudentList.vue'
import AddStudent from '../pages/AddStudent.vue'
import StudentDetails from '../pages/StudentDetails.vue'
import ClassManagement from '../pages/ClassManagement.vue'
import AssignCourses from '../pages/AssignCourses.vue'
import AttendanceTracking from '../pages/AttendanceTracking.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/students',
    name: 'StudentList',
    component: StudentList
  },
  {
    path: '/add-student',
    name: 'AddStudent',
    component: AddStudent
  },
  {
    path: '/student/:id',
    name: 'StudentDetails',
    component: StudentDetails,
    props: true
  },
  {
    path: '/class-management',
    name: 'ClassManagement',
    component: ClassManagement
  },
  {
    path: '/assign-courses',
    name: 'AssignCourses',
    component: AssignCourses
  },
  {
    path: '/attendance',
    name: 'AttendanceTracking',
    component: AttendanceTracking
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
