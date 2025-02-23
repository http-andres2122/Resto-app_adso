// src/api/facturacionService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todas las facturaciones
export const getFacturacion = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getFacturacion);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener facturación");
  }
};

// Obtener una facturación por ID
export const getFacturaById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getFacturaById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la facturación");
  }
};

// Crear una facturación
export const createFactura = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createFactura,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la facturación");
  }
};

// Actualizar una facturación
export const updateFactura = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateFactura(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la facturación");
  }
};

// Eliminar una facturación
export const deleteFactura = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteFactura(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la facturación");
  }
};
