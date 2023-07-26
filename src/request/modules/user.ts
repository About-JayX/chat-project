import {
  addUserApi,
  registerApi,
  loginApi,
  verfiyApi,
  getTokenApi,
  refreshTokenApi,
  testTokenApi,
} from '../api'
import request from '../index'

export function addUser<T>(params: Object) {
  return request.post<T>(addUserApi, params)
}

// 注册
export function register<T>(params: Object) {
  return request.post<T>(registerApi, params)
}
// 登录
export function login<T>(params: Object) {
  return request.post<T>(loginApi, params)
}
// 邮箱验证
export function verfiy<T>(params: Object) {
  return request.post<T>(verfiyApi, params)
}

export function getToken<T>(params: Object) {
  return request.post<T>(getTokenApi, params)
}
export function testToken<T>(params?: Object) {
  return request.post<T>(testTokenApi, params)
}

// 刷新token
export function refreshToken<T>(params: Object) {
  return request.post<T>(refreshTokenApi, params)
}
