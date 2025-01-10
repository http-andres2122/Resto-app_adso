// controllers/pedidoController.js
import pedido from "../models/pedidoModel.js"; // Importamos el modelo de pedido

const pedidoController = {
  obtenerPedidos: (req, res) => {
    pedido.obtenerPedidos((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener los pedidos" });
      }
      res.status(200).json(result);
    });
  },

  obtenerPedidoPorId: (req, res) => {
    const id = req.params.id;
    pedido.obtenerPedidoPorId(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener el pedido" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Pedido no encontrado" });
      }
      res.status(200).json(result[0]);
    });
  },

  crearPedido: (req, res) => {
    const { mesa_id, usuario_id, estado, observaciones } = req.body;

    if (!mesa_id || !usuario_id || !estado) {
      return res
        .status(400)
        .json({ message: "Mesa, usuario y estado son requeridos" });
    }

    pedido.crearPedido(
      mesa_id,
      usuario_id,
      estado,
      observaciones,
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error al crear el pedido" });
        }
        res
          .status(201)
          .json({ message: "Pedido creado exitosamente", id: result.insertId });
      }
    );
  },

  actualizarPedido: (req, res) => {
    const id = req.params.id;
    const { estado, observaciones } = req.body;

    if (!estado) {
      return res
        .status(400)
        .json({ message: "El estado del pedido es requerido" });
    }

    pedido.actualizarPedido(id, estado, observaciones, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el pedido" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Pedido no encontrado" });
      }
      res.status(200).json({ message: "Pedido actualizado exitosamente" });
    });
  },

  eliminarPedido: (req, res) => {
    const id = req.params.id;
    pedido.eliminarPedido(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al eliminar el pedido" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Pedido no encontrado" });
      }
      res.status(200).json({ message: "Pedido eliminado exitosamente" });
    });
  },
};

export default pedidoController;
