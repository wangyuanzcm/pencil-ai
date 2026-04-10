import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    fs: {
      // 允许从桌面端的打包产物目录直接读取，以便开发模式验证原始资源
      allow: [
        'd:/local_workspace/design-ai/apps/desktop/src/renderer/assets',
        // 相对上层
        path.resolve(__dirname, '..', 'desktop', 'src', 'renderer', 'assets')
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    sourcemap: true,
    outDir: 'dist'
  }
})
