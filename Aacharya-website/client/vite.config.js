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
        port: 5174,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
        headers: {
            // Prevent MIME-type sniffing
            'X-Content-Type-Options': 'nosniff',
            // Only allow images to be loaded from same origin (prevents hotlinking)
            'Content-Security-Policy': "default-src 'self'; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
            // Prevent embedding in iframes (clickjacking)
            'X-Frame-Options': 'SAMEORIGIN',
            // Control referrer info to prevent asset URL leaking
            'Referrer-Policy': 'strict-origin-when-cross-origin',
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
        // Ensure asset filenames include content hash for cache busting
        assetsInlineLimit: 4096,
    },
})

