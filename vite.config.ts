import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'

export default defineConfig({
  plugins: [
    commonjs(),
    react(),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'documentation-template'],
    force: true,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/documentation-template/, /node_modules/],
    },
  },
})
