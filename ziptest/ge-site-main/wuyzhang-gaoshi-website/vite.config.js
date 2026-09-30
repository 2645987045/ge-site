import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        videos: resolve(__dirname, 'videos.html'),
        characters: resolve(__dirname, 'characters.html'),
        behind: resolve(__dirname, 'behind.html'),
        about: resolve(__dirname, 'about.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
