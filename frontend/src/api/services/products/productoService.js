// src/api/services/products/productoService.js
import axiosInstance from "../../axios.config";
import { API_ENDPOINTS } from "../../endpoints";

// Obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getProductos);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getProductoById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el producto");
  }
};

// Crear un producto
export const createProducto = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createProducto,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

// Actualizar un producto
export const updateProducto = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateProducto(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};

// Eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteProducto(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};
