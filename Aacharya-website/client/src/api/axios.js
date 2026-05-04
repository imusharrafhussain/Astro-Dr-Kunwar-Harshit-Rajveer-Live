import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://dr-kunwar-harshit-rajveer.onrender.com/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

export default API;
