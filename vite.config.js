import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@services': path.resolve(import.meta.dirname, './src/services'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@context': path.resolve(import.meta.dirname, './src/context'),
      '@store': path.resolve(import.meta.dirname, './src/store'),
      '@routes': path.resolve(import.meta.dirname, './src/routes'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@layouts': path.resolve(import.meta.dirname, './src/layouts'),
    },
  },
})
