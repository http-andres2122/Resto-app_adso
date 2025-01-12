// src/api/userService.js
import axiosInstance from "../../axios.config";
import { API_ENDPOINTS } from "../../endpoints";

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getUsuarios);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener usuarios");
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getUsuarioById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el usuario");
  }
};

// Crear un usuario
export const createUsuario = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createUsuario,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el usuario");
  }
};

// Actualizar un usuario
export const updateUsuario = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateUsuario(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el usuario");
  }
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteUsuario(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el usuario");
  }
};
