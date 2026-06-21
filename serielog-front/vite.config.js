import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuração do Vite para o projeto Vue 3
// O plugin vue() permite que o Vite processe arquivos .vue (Single File Components)
export default defineConfig({
  plugins: [vue()],
})
