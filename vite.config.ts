import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置@路径
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // 配置打包路径
  base: './',
  server: {
    port: 8888,
    open: true,
    cors: true,
  },
})
