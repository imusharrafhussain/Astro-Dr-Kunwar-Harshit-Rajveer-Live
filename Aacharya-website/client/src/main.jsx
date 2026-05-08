import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'
import './App.css'
import './ResponsiveFix.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: { background: '#12122a', color: '#f5f0e8', border: '1px solid #d4a843' },
                    success: { iconTheme: { primary: '#d4a843', secondary: '#12122a' } },
                }}
            />
        </BrowserRouter>
    </React.StrictMode>
)
