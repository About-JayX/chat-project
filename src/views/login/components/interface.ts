export type LoginType = 'emailLogin' | 'psdLogin' | 'register'

export class LoginForm {
  email: string = '1461471381@qq.com'
  password: string = '234567'
  rePassword: string = '234567'
  verify: string = '123456'
}

export interface ReqLogin {}

export interface ResLogin {
  token: ''
}
