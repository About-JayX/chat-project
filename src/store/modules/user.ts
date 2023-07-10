import { defineStore } from "pinia";
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
})