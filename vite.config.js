import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { robots } from 'vite-plugin-robots';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({ hostname: 'https://namlapan.studio' }),
    robots(),
  ],
  server: {
    host: true,
    allowedHosts: [
      // '.ngrok-free.app',
      // 'fd5c562663b7.ngrok-free.app'
    ],
  },
})
