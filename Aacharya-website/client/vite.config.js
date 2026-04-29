import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:5001',
                changeOrigin: true,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return
                    if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                        return 'vendor-react'
                    }
                    if (id.includes('framer-motion') || id.includes('three') || id.includes('cobe')) {
                        return 'vendor-graphics'
                    }
                    if (id.includes('react-icons') || id.includes('react-hot-toast')) {
                        return 'vendor-ui'
                    }
                    return 'vendor'
                },
            },
        },
    },
})
