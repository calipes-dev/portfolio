import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [tailwindcss(), viteSingleFile()],
  build: { assetsInlineLimit: Number.MAX_SAFE_INTEGER },
})
