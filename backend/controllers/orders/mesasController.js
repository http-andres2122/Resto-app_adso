// mesasController.js (Controlador)
import mesas from "../../models/orders/mesasModel.js";

const mesasController = {
  obtenerMesas: (req, res) => {
    mesas.obtenerMesas((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener las mesas" });
      }
      res.status(200).json(result);
    });
  },

  obtenerMesaPorId: (req, res) => {
    const id = req.params.id;
    mesas.obtenerMesaPorId(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener la mesa" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Mesa no encontrada" });
      }
      res.status(200).json(result[0]);
    });
  },

  crearMesa: (req, res) => {
    const { numero, capacidad } = req.body;
    if (!numero || !capacidad) {
      return res.status(400).json({
        message: "El número y la capacidad de la mesa son obligatorios",
      });
    }
    mesas.crearMesa(numero, capacidad, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al crear la mesa" });
      }
      res
        .status(201)
        .json({ message: "Mesa creada exitosamente", id: result.insertId });
    });
  },

  actualizarMesa: (req, res) => {
    const id = req.params.id;
    const { numero, capacidad } = req.body;
    if (!numero || !capacidad) {
      return res.status(400).json({
        message: "El número y la capacidad de la mesa son obligatorios",
      });
    }
    mesas.actualizarMesa(id, numero, capacidad, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al actualizar la mesa" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Mesa no encontrada" });
      }
      res.status(200).json({ message: "Mesa actualizada exitosamente" });
    });
  },

  eliminarMesa: (req, res) => {
    const id = req.params.id;
    mesas.eliminarMesa(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al eliminar la mesa" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Mesa no encontrada" });
      }
      res.status(200).json({ message: "Mesa eliminada exitosamente" });
    });
  },
};

export default mesasController;
