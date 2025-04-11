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

  /**
   * Actualiza una orden existente en la base de datos
   *
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} req.params - Parámetros de la URL
   * @param {string} req.params.id - ID de la orden a actualizar
   * @param {Object} req.body - Datos de la orden a actualizar
   * @param {string|number} req.body.table_num - Número o ID de la mesa
   * @param {string|number} [req.body.customer_id] - ID del cliente (opcional)
   * @param {string} req.body.status - Estado actual de la orden (Pendiente, Enviado, Cancelado, etc.)
   * @param {string} [req.body.comments] - Comentarios adicionales sobre la orden
   * @param {string} [req.body.shippingAddress] - Dirección de envío
   * @param {number} req.body.total - Monto total de la orden
   * @param {Array|string} req.body.items - Array de productos o string JSON con los productos
   * @param {Object} res - Objeto de respuesta Express
   *
   * @returns {JSON} - Respuesta JSON con mensaje de éxito o error
   *
   * @example
   * // Petición
   * // PUT /api/orders/1
   * {
   *   "table_num": 3,
   *   "customer_id": 2,
   *   "status": "Enviado",
   *   "comments": "Sin cebolla, extra queso",
   *   "shippingAddress": "Calle 123 #45-67",
   *   "total": 45000,
   *   "items": [
   *     {
   *       "id": 1,
   *       "name": "Hamburguesa",
   *       "price": 15000,
   *       "quantity": 2
   *     },
   *     {
   *       "id": 3,
   *       "name": "Refresco",
   *       "price": 5000,
   *       "quantity": 3
   *     }
   *   ]
   * }
   *
   * // Respuesta exitosa
   * {
   *   "success": true,
   *   "message": "Pedido 1 actualizado correctamente",
   *   "order_id": 1
   * }
   *
   * // Respuesta de error
   * {
   *   "message": "Error al actualizar la orden"
   * }
   */
  updateOrder: (req, res) => {
    try {
      // Obtener el ID de la orden desde los parámetros
      const id = parseInt(req.params.id);

      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID de orden inválido",
        });
      }

      // Extraer datos del body
      const {
        table_num,
        customer,
        status,
        comments,
        shippingAddress,
        total,
        items,
      } = req.body;

      // Extraer el ID del cliente desde el objeto customer
      const customer_id = customer?.id;

      // Validaciones básicas
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "El estado de la orden es requerido",
        });
      }

      if (total === undefined || total === null) {
        return res.status(400).json({
          success: false,
          message: "El total de la orden es requerido",
        });
      }

      if (!items) {
        return res.status(400).json({
          success: false,
          message: "Los items de la orden son requeridos",
        });
      }

      // Crear objeto con datos a actualizar
      const orderData = {
        id,
        table_num,
        customer_id,
        status,
        comments,
        shippingAddress,
        total,
        items,
      };

      // Llamar al modelo para actualizar la orden
      pedido.updateOrder(orderData, (err, result) => {
        if (err) {
          console.error("Error al actualizar la orden:", err);
          return res.status(500).json({
            success: false,
            message: "Error al actualizar la orden",
            error: err.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: `Pedido ${id} actualizado correctamente`,
          order_id: id,
        });
      });
    } catch (error) {
      console.error("Error en updateOrder:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error.message,
      });
    }
  },
};

export default pedidoController;
