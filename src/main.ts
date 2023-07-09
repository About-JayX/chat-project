import { createApp } from 'vue'
import App from './App.vue'
import antD from 'ant-design-vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(antD)
app.mount('#app')
