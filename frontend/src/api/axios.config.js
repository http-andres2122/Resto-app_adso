// api/axios.config.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.react_api,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para tokens
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;