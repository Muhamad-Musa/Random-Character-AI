import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Projects from '../pages/Projects.vue'
import Board from '../pages/Board.vue'
import Calendar from '../pages/Calendar.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/board', component: Board },
  { path: '/calendar', component: Calendar }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
