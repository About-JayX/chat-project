import { RouteRecordRaw } from 'vue-router'
let routeFiles = import.meta.glob('@/views/*/**.vue', { eager: true })
const routes: Array<RouteRecordRaw> = []

interface moudleType {
  [key: string]: any
}

Object.entries(routeFiles).map(([file, moudle]) => {
  const route = getRouteMoudle(file, moudle as moudleType)
  if (route) {
    routes.push(route)
  }
})

function getRouteMoudle(file: string, moudle: moudleType) {
  const baseUrl = '/views'
  // 标识页面出口文件
  let lastIndex
  if ((lastIndex = file.indexOf('index.vue')) > -1) {
    let startIndex = file.indexOf(baseUrl) + baseUrl.length + 1
    let name = file.substring(startIndex, lastIndex - 1)
    return {
      path: `/${name}`,
      name,
      component: moudle.default,
    } as RouteRecordRaw
  }
}
export default routes
