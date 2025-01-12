// src/api/axiosConfig.js
import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

const apiUrl = import.meta.env.VITE_APP_API_URL;
console.log(apiUrl);

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token es inválido o ha expirado, redirigir al login
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
