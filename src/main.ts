import { createApp } from 'vue'
import App from './App.vue'
import antD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import '@/styles/global.scss'
import store from "@/store/index";
const app = createApp(App)
app.use(router)
app.use(store)
app.use(antD)
app.mount('#app')
