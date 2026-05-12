import axios from 'axios';

let baseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://astro-dr-kunwar-harshit-rajveer-live.onrender.com/api');
if (baseUrl && !baseUrl.endsWith('/api')) {
    // Ensure baseUrl ends with /api without adding a double slash
    baseUrl = baseUrl.endsWith('/') ? `${baseUrl}api` : `${baseUrl}/api`;
}

const API = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
});

// Response Interceptor to globally handle errors
export default API;
