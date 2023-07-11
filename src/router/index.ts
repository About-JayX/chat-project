import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
const routes: Array<RouteRecordRaw> = []
// 动态导入路由组件
const routeFiles = import.meta.glob('@/views/*.vue');


for(let path in routeFiles){
  const name = (path as any).match(/\/views\/(.+)\.vue$/)[1];
  const component = () => import(`@/views/${name}.vue`)
  const route = {
    path:`/${name.toLowerCase()}`,
    name:`/${name.toLowerCase()}`,
    component
  };
  routes.push(route)
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
