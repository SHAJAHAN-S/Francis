import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'motion-utils',
        replacement: resolve(__dirname, 'node_modules/motion-utils/dist/motion-utils.js'),
      },
      {
        find: 'motion-dom',
        replacement: resolve(__dirname, 'node_modules/motion-dom/dist/es/index.mjs'),
      },
    ],
  },
  optimizeDeps: {
    include: ['framer-motion', 'motion-utils']
  },
  build: {
    cssMinify: 'esbuild',
  },
})
