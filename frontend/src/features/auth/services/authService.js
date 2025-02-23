// src/api/authService.js
import axiosInstance from "../../../app/config/axios.config";
import { API_ENDPOINTS } from "../../../app/config/endpoints";

// Login
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.login, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register
export const register = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.register, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al registrar el usuario");
  }
};

// Logout
export const logout = async () => {
  try {
    await axiosInstance.post(API_ENDPOINTS.logout);
    localStorage.removeItem("authToken");
  } catch (error) {
    throw new Error("Error al intentar cerrar sesión");
  }
};

// Profile
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.profile);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el perfil");
  }
};
