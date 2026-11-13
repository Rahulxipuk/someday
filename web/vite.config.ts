import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths, so the site works from any folder of a static host.
  base: './',
  server: {
    port: 5173,
    strictPort: true,
    // The crypto lives in packages/sealbox, one level above this folder.
    fs: { allow: ['..'] },
  },
});
