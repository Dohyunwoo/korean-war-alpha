import VueRouter from 'vue-router'
import Index from '@/routes/index'

const routes = [{
  path: '/',
  name: 'index',
  component: Index
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
