import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Chat from '../pages/Chat.vue'
import Characters from '../pages/Characters.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/chat', component: Chat },
  { path: '/characters', component: Characters },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
