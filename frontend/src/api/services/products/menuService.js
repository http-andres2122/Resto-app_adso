// src/api/services/products/menuService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todos los productos en el menú
export const getMenu = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getMenu);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el menú");
  }
};

// Obtener un producto del menú por ID
export const getMenuById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getMenuById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el producto del menú");
  }
};

// Crear un producto en el menú
export const createMenu = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.createMenu, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el producto en el menú");
  }
};

// Actualizar un producto del menú
export const updateMenu = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateMenu(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el producto del menú");
  }
};

// Eliminar un producto del menú
export const deleteMenu = async (id) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.deleteMenu(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el producto del menú");
  }
};
