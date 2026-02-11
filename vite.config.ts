import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/worst-website/',
  plugins: [
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackRouter(),
    tailwindcss(),
    viteReact(),
  ],
})
