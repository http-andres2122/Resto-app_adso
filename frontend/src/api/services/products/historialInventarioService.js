// src/api/historialInventarioService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todos los historial de inventario
export const getHistorialInventario = async () => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.getHistorialInventario
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener historial de inventario");
  }
};

// Obtener un historial de inventario por ID
export const getHistorialInventarioById = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.getHistorialInventarioById(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener historial de inventario");
  }
};

// Crear un historial de inventario
export const createHistorialInventario = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createHistorialInventario,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear historial de inventario");
  }
};

// Actualizar un historial de inventario
export const updateHistorialInventario = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateHistorialInventario(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar historial de inventario");
  }
};

// Eliminar un historial de inventario
export const deleteHistorialInventario = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteHistorialInventario(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar historial de inventario");
  }
};
