import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    hmr: {
      // Specifies the hostname for the HMR connection
      host: 'localhost',
      // Specifies the protocol; useful if you're using HTTPS
      protocol: 'ws',
      // Sets the port for the HMR server (default is the dev server port)
      port: 3000,
    },
    // Enable polling if file changes aren't detected
    watch: {
      usePolling: true,
    },
    build: {
      outDir: 'dist',
    },
  },
});
