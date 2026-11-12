import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: { port: 5177 },
  preview: { port: 4177 },
})
