import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: { port: 5175 },
  preview: { port: 4175 },
})
