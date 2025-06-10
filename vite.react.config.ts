import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as ImportMetaEnv
  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'react'),
      },
    },
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: false,
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace('/api/', '/'),
        },
      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
    },
  }
})
