import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //axios 타겟 설정 -> 모든 url 적을때 개발단계에서 기본 default값
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
      },
    },
  },
})
