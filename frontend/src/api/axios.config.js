import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
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
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      console.log("Token eliminado por 401");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
