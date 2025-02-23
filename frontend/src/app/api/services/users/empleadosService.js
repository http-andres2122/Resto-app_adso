// src/api/empleadoService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todos los empleados
export const getEmpleados = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getEmpleados);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener empleados");
  }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getEmpleadoById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el empleado");
  }
};

// Crear un empleado
export const createEmpleado = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createEmpleado,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el empleado");
  }
};

// Actualizar un empleado
export const updateEmpleado = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateEmpleado(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el empleado");
  }
};

// Eliminar un empleado
export const deleteEmpleado = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteEmpleado(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el empleado");
  }
};
