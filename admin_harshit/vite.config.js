import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Serve files from the existing project-level `assets/` folder
  // so we can reuse your provided logo without copying binaries.
  publicDir: '../assets',
  plugins: [react()],
})
