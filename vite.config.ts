import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src')
    },
    },
    server: {
        port: 3000, // Change if needed
        open: true, // Opens the browser on start
    },
    build: {
        outDir: 'dist',
        sourcemap: true, // Helps with debugging
    },
});
