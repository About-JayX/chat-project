import { defineStore } from 'pinia'
import piniaPersistConfig from '../piniaPersist'
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
    userInfo: { name: '', avatar: '' },
  }),
  getters: {},
  actions: {
    async setToken(token: string) {
      this.token = token
    },
    async setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
  },
  persist: piniaPersistConfig({
    data: [
      { key: 'TOKEN', paths: ['token'] },
      { key: 'USER_INFO', paths: ['userInfo'] },
    ],
  }),
})
