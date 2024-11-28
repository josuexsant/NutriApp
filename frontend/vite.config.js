// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Aquí está el puerto configurado
  },
});
