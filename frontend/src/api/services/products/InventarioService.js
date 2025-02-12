// src/api/services/products/inventarioService.js
import axiosInstance from "../../axios.config";
import { API_ENDPOINTS } from "../../endpoints";

// Obtener todos los inventarios
export const getInventario = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getInventario);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener inventarios");
  }
};

// Obtener un inventario por ID
export const getInventarioById = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.getInventarioById(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener inventario");
  }
};

// Crear un inventario
export const createInventario = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createInventario,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear inventario");
  }
};

// Actualizar un inventario
export const updateInventario = async (data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateInventario(data.producto_id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar inventario");
  }
};

// Eliminar un inventario
export const deleteInventario = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteInventario(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar inventario");
  }
};
