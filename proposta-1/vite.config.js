import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
})
