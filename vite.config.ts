import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import dotenv package
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa'
import reactRefresh from '@vitejs/plugin-react-refresh'
// run package config
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({ registerType: 'autoUpdate' }), reactRefresh()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `[name].[hash].js`,
                chunkFileNames: `[name].[hash].js`,
                assetFileNames: `[name].[hash].[ext]`,
            },
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    define: {
        'process.env': process.env,
    },

})

