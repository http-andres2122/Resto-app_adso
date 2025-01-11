import pagosModel from "../../models/invoice/pagosModel.js";

// Controlador para obtener todos los pagos
const getAllPagos = async (req, res) => {
  try {
    const pagos = await pagosModel.getAllPagos();
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pagos" });
  }
};

// Controlador para obtener un pago por ID
const getPagoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pago = await pagosModel.getPagoById(id);
    if (pago) {
      res.status(200).json(pago);
    } else {
      res.status(404).json({ error: "Pago no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pago" });
  }
};

// Controlador para crear un nuevo pago
const createPago = async (req, res) => {
  const { monto, fecha_pago, metodo_pago, reserva_id } = req.body;
  try {
    const pagoId = await pagosModel.createPago(
      monto,
      fecha_pago,
      metodo_pago,
      reserva_id
    );
    res.status(201).json({ id: pagoId, message: "Pago creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pago" });
  }
};

// Controlador para actualizar un pago
const updatePago = async (req, res) => {
  const { id } = req.params;
  const { monto, fecha_pago, metodo_pago, reserva_id } = req.body;
  try {
    const updatedPagoId = await pagosModel.updatePago(
      id,
      monto,
      fecha_pago,
      metodo_pago,
      reserva_id
    );
    res
      .status(200)
      .json({ id: updatedPagoId, message: "Pago actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};

// Controlador para eliminar un pago
const deletePago = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPagoId = await pagosModel.deletePago(id);
    res
      .status(200)
      .json({ id: deletedPagoId, message: "Pago eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pago" });
  }
};

export default {
  getAllPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago,
};
