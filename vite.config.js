import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// sitemap.xml and robots.txt are emitted by scripts/gen-seo-files.mjs after the
// build — see that file for why the old Vite plugins were dropped.

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    allowedHosts: [
      // '.ngrok-free.app',
      // 'fd5c562663b7.ngrok-free.app'
    ],
  },
})
