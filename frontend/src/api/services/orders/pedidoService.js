// src/api/pedidoService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todos los pedidos
export const getPedidos = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getPedidos);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener pedidos");
  }
};

// Obtener un pedido por ID
export const getPedidoById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getPedidoById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el pedido");
  }
};

// Crear un pedido
export const createPedido = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.createPedido, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el pedido");
  }
};

// Actualizar un pedido
export const updatePedido = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updatePedido(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el pedido");
  }
};

// Eliminar un pedido
export const deletePedido = async (id) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.deletePedido(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el pedido");
  }
};
