import axios from 'axios';

// Create a globally configured Axios instance
const api = axios.create({
    // VITE_API_URL will default to standard localhost:8080 if not set
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Configure Request Interceptor to automatically attach JWT token from LocalStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
