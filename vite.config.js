import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    https: false,
    allowedHosts: ['1341adee7aea.ngrok-free.app']
  },
})
