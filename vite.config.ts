import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react(),
  checker({
    typescript: true,
    overlay: {
      initialIsOpen: false,
    },
  }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    outDir: "dist",
  },
  base: "/",
})