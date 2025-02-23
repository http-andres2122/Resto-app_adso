// src/api/pagoService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todos los pagos
export const getPagos = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getPagos);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener pagos");
  }
};

// Obtener un pago por ID
export const getPagoById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getPagoById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el pago");
  }
};

// Crear un pago
export const createPago = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.createPago, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el pago");
  }
};

// Actualizar un pago
export const updatePago = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updatePago(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el pago");
  }
};

// Eliminar un pago
export const deletePago = async (id) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.deletePago(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el pago");
  }
};
