import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Reduce memory usage
    hmr: {
      overlay: false
    },
    // Increase timeout for slow machines
    timeout: 120000
  },
  // Optimize build
  build: {
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
    // Minimize CSS
    cssCodeSplit: true
  }
})
