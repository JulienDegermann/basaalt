import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../basaalt-api/public'
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
    },
  },

})
