import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    commonjs(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'stageflow-docs/**/*',
          dest: 'stageflow-docs'
        }
      ]
    })
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
