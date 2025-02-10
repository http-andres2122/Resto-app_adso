// src/api/services/products/categoriaService.js
import axiosInstance from "../../axios.config";
import { API_ENDPOINTS } from "../../endpoints";

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getCategorias);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener categorías");
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.getCategoriaById(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la categoría");
  }
};

// Crear una categoría
export const createCategoria = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createCategoria,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la categoría");
  }
};

// Actualizar una categoría
export const updateCategoria = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateCategoria(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la categoría");
  }
};

// Eliminar una categoría
export const deleteCategoria = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteCategoria(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la categoría");
  }
};
