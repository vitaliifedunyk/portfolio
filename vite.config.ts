import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.split('\\').join('/');

          if (normalizedId.includes('/node_modules/three/')) {
            return 'vendor-three';
          }

          if (normalizedId.includes('/node_modules/gsap/')) {
            return 'vendor-gsap';
          }

          return undefined;
        },
      },
    },
  },
});
