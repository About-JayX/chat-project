export type LoginType = 'emailLogin' | 'psdLogin' | 'register'

export class LoginForm {
  email: string = '1461471381@qq.com'
  password: string = '234567'
  rePassword: string = ''
  verify: string = ''
}

export interface ReqLogin {}

export interface ResLogin {
  _id: string
  userName: String
  userInfo: {
    nickName?: String
    sex?: Number
    email?: String
    phone?: String
    avatar?: String
    //  -1 未填写用户信息 0 禁用 1 正常
    status: Number
  }
}
export interface ResToken {
  token: string
}
