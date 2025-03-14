// controllers/pedidoController.js
import pedido from "../../models/orders/pedidoModel.js"; // Importamos el modelo de pedido

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

  /*
  New methods
  */

  // Obtener ordenes
  /**
   *
   * @param {Object} req
   * @param {object} res
   *
   * @returns {JSON}
   *
   * @example
   * //respuesta esperada
   *
   * "orders": [
   *     {
   *         "id": 1,
   *         "table": [
   *             {
   *                 "id": 1,
   *                 "number": 1,
   *                 "capacity": 4
   *             }
   *         ],
   *         "customer": [
   *             {
   *                 "id": 1,
   *                 "email": "admin@example.com",
   *                 "first_name": "Admin",
   *                 "last_name": "User",
   *                 "num_doc": null,
   *                 "num_phone": null
   *             }
   *         ],
   *         "shippingAddress": null,
   *         "items": null,
   *         "total": null,
   *         "fecha": "2024-12-26T01:45:22.000Z",
   *         "status": "En preparación",
   *         "comments": "Sin cebolla en la pizza"
   *   },
   * ]
   */
  getOrdersForm: (req, res) => {
    pedido.getOrdersForm((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener las ordenes" });
      }
      res.status(200).json(result);
    });
  },
};

export default pedidoController;
