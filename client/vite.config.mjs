/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  console.log('cwd: ', process.cwd())
  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      dir: './client/src/components',
      setupFiles: './client/testSetup.js',
    },
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${env.PORT || 3003}/`,
          changeOrigin: true,
        },
      },
    },
  }
})
