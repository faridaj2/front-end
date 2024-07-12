import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': import.meta.env
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://backend.test/',
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/storage': {
        target: 'http://backend.test/',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})
