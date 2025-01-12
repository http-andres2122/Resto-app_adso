// src/api/mesaService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todas las mesas
export const getMesas = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getMesas);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener mesas");
  }
};

// Obtener una mesa por ID
export const getMesaById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getMesaById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la mesa");
  }
};

// Crear una mesa
export const createMesa = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.createMesa, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la mesa");
  }
};

// Actualizar una mesa
export const updateMesa = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateMesa(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la mesa");
  }
};

// Eliminar una mesa
export const deleteMesa = async (id) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.deleteMesa(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la mesa");
  }
};
