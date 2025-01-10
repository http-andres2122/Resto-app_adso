import reservasModel from "../models/revervasModel.js";

// Controlador para obtener todas las reservas
const getAllReservas = async (req, res) => {
  try {
    const reservas = await reservasModel.getAllReservas();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

// Controlador para obtener una reserva por ID
const getReservaById = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await reservasModel.getReservaById(id);
    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reserva" });
  }
};

// Controlador para crear una nueva reserva
const createReserva = async (req, res) => {
  const { mesa_id, fecha_reserva, hora_reserva, usuario_id } = req.body;
  try {
    const reservaId = await reservasModel.createReserva(
      mesa_id,
      fecha_reserva,
      hora_reserva,
      usuario_id
    );
    res
      .status(201)
      .json({ id: reservaId, message: "Reserva creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

// Controlador para actualizar una reserva
const updateReserva = async (req, res) => {
  const { id } = req.params;
  const { mesa_id, fecha_reserva, hora_reserva, usuario_id } = req.body;
  try {
    const updatedReservaId = await reservasModel.updateReserva(
      id,
      mesa_id,
      fecha_reserva,
      hora_reserva,
      usuario_id
    );
    res.status(200).json({
      id: updatedReservaId,
      message: "Reserva actualizada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reserva" });
  }
};

// Controlador para eliminar una reserva
const deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservaId = await reservasModel.deleteReserva(id);
    res.status(200).json({
      id: deletedReservaId,
      message: "Reserva eliminada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};

export default {
  getAllReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
};
