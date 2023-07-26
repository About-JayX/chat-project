import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import NProgress from '@/utils/nprogress'
import routes from '@/utils/autoRoute'

const notFoundPage = {
  path: "/:pathMatch(.*)*",
  component: () => import("@/view/404.vue")
}

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, notFoundPage],
})

// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore()

//   // NProgress 开始
//   NProgress.start()

//   // 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
//   if (to.path.toLocaleLowerCase() === '/login') {
//     if (userStore.token) return next(from.fullPath)
//     return next()
//   }

//   // 5.判断是否有 Token，没有重定向到 login 页面
//   if (!userStore.token) return next({ path: '/login', replace: true })

//   // 8.正常访问页面
//   next()
// })

router.onError(error => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

router.afterEach(() => {
  NProgress.done()
})

export default router
