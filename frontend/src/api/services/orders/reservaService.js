// src/api/reservaService.js
import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

// Obtener todas las reservas
export const getReservas = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getReservas);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener reservas");
  }
};

// Obtener una reserva por ID
export const getReservaById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getReservaById(id));
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la reserva");
  }
};

// Crear una reserva
export const createReserva = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.createReserva,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la reserva");
  }
};

// Actualizar una reserva
export const updateReserva = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.updateReserva(id),
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la reserva");
  }
};

// Eliminar una reserva
export const deleteReserva = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.deleteReserva(id)
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la reserva");
  }
};
