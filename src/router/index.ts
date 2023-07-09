import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import home from '@/components/home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: home,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/home.vue'),
  },
  {
    path: '/testHome',
    name: 'testHome',
    component: () => import('@/components/testHome.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
