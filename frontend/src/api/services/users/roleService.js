// src/api/roleService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todos los roles
export const getRoles = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getRoles);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener roles");
  }
};

// Obtener un rol por ID
export const getRoleById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getRoleById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el rol");
  }
};

// Crear un rol
export const createRole = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.createRole, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el rol");
  }
};

// Actualizar un rol
export const updateRole = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateRole(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el rol");
  }
};

// Eliminar un rol
export const deleteRole = async (id) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.deleteRole(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el rol");
  }
};
