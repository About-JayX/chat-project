export type LoginType = "emailLogin" | "psdLogin" | "register"

export class LoginForm {
    email:string = ''
    password:string = ''
    rePassword:string = ''
    verify:string = ''
}


export interface ReqLogin {
    
}

export interface ResLogin {
    token:''
}