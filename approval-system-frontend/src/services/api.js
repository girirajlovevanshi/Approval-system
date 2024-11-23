import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Backend URL
});

// Add Authorization header if token exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;