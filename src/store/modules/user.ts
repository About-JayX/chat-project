import { defineStore } from "pinia";
import  piniaPersistConfig  from "../piniaPersist";
export const useUserStore = defineStore({
    id:"user",
    state:()=>({
        token:'',
        userInfo:{name:"",avatar:""}
    }),
    getters:{},
    actions:{
        setToken(token:string){
            this.token = token
        },
        setUserInfo(userInfo:any){
            this.userInfo = userInfo
        }
    },
    persist:piniaPersistConfig("myToken",["token"]) //设置本地存储
})