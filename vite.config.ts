import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Use root path for Netlify, subdirectory for GitHub Pages
  const base = mode === 'netlify' ? '/' : '/ToDoListWebApp-Itinerary/'
  
  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true
    }
  }
})
