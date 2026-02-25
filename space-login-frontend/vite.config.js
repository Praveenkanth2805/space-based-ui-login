// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // This line prevents the "Failed to resolve module specifier" error
      external: ['@react-spring/web'],
    },
  },
  optimizeDeps: {
    // Helps dev mode too
    include: ['@react-spring/web'],
  },
})