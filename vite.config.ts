import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve("node_modules/scichart/_wasm/scichart2d.data")),
          dest: './'
        },
        {
          src: normalizePath(path.resolve("node_modules/scichart/_wasm/scichart2d.wasm")),
          dest: './'
        },
      ]
    })
  ],
})
