import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ResWholeData } from './interface'
import { useUserStore } from '@/store/modules/user'
import { refreshToken } from './modules/user'

// axios配置
const config = {
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true, // 跨域时候允许携带凭证
}
const requestQueue: any[] = [] // 请求队列
let isRefreshing = false //判断刷新令牌是否进行的标识，当触发无感刷新时，将其设为true

class HttpRequest {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userStore = useUserStore()
        // 1.请求头添加token
        if (userStore.token) {
          this.service.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${userStore.token}`
        }
        // 2.在请求发送前检查刷新令牌是否正在进行, 如果是，则将请求放入队列中，等待刷新完成后重新发送
        if (isRefreshing) {
          return new Promise(resolve => {
            requestQueue.push(() => {
              resolve(this.service(config))
            })
          })
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse): any => {

        const { status } = response
        // 如果token令牌过期
        if (status === 401) {
          if (!isRefreshing) {
            isRefreshing = true
            // 刷新令牌
            const postData = {}
            return refreshToken(postData)
              .then((newToken: any) => {
                // 更新请求的授权头部信息为新的令牌
                this.service.defaults.headers.common[
                  'Authorization'
                ] = `Bearer ${newToken}`
                // 执行之前失败的请求队列中的请求
                processRequestQueue()
                // 继续返回之前的响应
                return response
              })
              .catch(e => {
                // 处理刷新令牌失败的情况
              })
              .finally(() => {
                // 重置标识
                isRefreshing = false
              })
          } else {
            // 当前已经有刷新令牌的操作正在进行，将请求放入队列中，等待刷新完成后重新发送
            return new Promise(resolve => {
              requestQueue.push(() => {
                resolve(this.service(response.config))
              })
            })
          }
        }
        // 对于其他响应，直接返回
        
        return response.data
      },
      (error: AxiosError) => {
        /** 相关操作 */
        return Promise.reject(error)
      }
    )
  }

  get<T>(url: string, params?: object): Promise<ResWholeData<T>> {
    return this.service.get(url, { params })
  }
  post<T>(url: string, params?: object | string): Promise<ResWholeData<T>> {
    return this.service.post(url, params)
  }
  put<T>(url: string, params?: object): Promise<ResWholeData<T>> {
    return this.service.put(url, params)
  }
  delete<T>(url: string, params?: object): Promise<ResWholeData<T>> {
    return this.service.delete(url, { params })
  }
}

// 处理请求队列中的请求，并将队列清空
function processRequestQueue() {
  while (requestQueue.length) {
    const request = requestQueue.shift()
    request()
  }
}

export default new HttpRequest(config)
