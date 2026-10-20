import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permite que funcione en GitHub Pages sin importar el subdirectorio del repositorio
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
