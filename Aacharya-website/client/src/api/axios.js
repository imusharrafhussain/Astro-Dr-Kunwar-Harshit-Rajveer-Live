import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://dr-kunwar-harshit-rajveer.onrender.com/api'),
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

export default API;
