// controllers/facturacionController.js
import facturacion from "../models/facturacionModel.js"; // Importamos el modelo de facturación

const facturacionController = {
  obtenerFacturas: (req, res) => {
    facturacion.obtenerFacturas((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener las facturas" });
      }
      res.status(200).json(result);
    });
  },

  obtenerFacturaPorId: (req, res) => {
    const id = req.params.id;
    facturacion.obtenerFacturaPorId(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener la factura" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      res.status(200).json(result[0]);
    });
  },

  crearFactura: (req, res) => {
    const { pedido_id, total } = req.body;

    if (!pedido_id || !total) {
      return res
        .status(400)
        .json({ message: "Pedido ID y total son requeridos" });
    }

    facturacion.crearFactura(pedido_id, total, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al crear la factura" });
      }
      res
        .status(201)
        .json({ message: "Factura creada exitosamente", id: result.insertId });
    });
  },

  actualizarFactura: (req, res) => {
    const id = req.params.id;
    const { total } = req.body;

    if (!total) {
      return res
        .status(400)
        .json({ message: "El total de la factura es requerido" });
    }

    facturacion.actualizarFactura(id, total, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar la factura" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      res.status(200).json({ message: "Factura actualizada exitosamente" });
    });
  },

  eliminarFactura: (req, res) => {
    const id = req.params.id;
    facturacion.eliminarFactura(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al eliminar la factura" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      res.status(200).json({ message: "Factura eliminada exitosamente" });
    });
  },
};

export default facturacionController;
