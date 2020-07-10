import VueRouter from 'vue-router'
import Index from '@/routes/index'
import Patriotic from '@/routes/patriotic'
import Un from '@/routes/un'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/patriotic',
    name: 'patriotic',
    component: Patriotic
  },
  {
    path: '/un',
    name: 'un',
    component: Un
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
