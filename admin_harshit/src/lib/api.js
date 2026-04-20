import axios from 'axios';
import { getToken, clearToken } from './auth';

const api = axios.create({
  // Your backend listens correctly on 127.0.0.1 in this environment.
  baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000',
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      clearToken();
      if (window.location.pathname !== '/login') window.location.assign('/login');
    }
    return Promise.reject(err);
  }
);

export default api;

