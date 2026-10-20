import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        roadmaps: resolve(__dirname, 'pages/roadmaps.html'),
        lessons: resolve(__dirname, 'pages/lessons.html'),
        quizzes: resolve(__dirname, 'pages/quizzes.html'),
        about: resolve(__dirname, 'pages/about.html'),
        certificates: resolve(__dirname, 'pages/certificates.html'),
        progress: resolve(__dirname, 'pages/progress.html'),
      },
    },
  },
});