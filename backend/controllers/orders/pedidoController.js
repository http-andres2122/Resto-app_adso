// controllers/pedidoController.js
import pedido from "../../models/orders/pedidoModel.js"; // Importamos el modelo de pedido

const pedidoController = {
  // Obtener ordenes con formulario detallado
  getOrdersForm: (req, res) => {
    pedido.getOrdersForm((err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al obtener las ordenes",
          error: err.message,
        });
      }
      res.status(200).json(result);
    });
  },

  /**
   * Crea una nueva orden en la base de datos
   *
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} req.body - Datos de la orden a crear
   * @param {Object} res - Objeto de respuesta Express
   *
   * @returns {JSON} - Respuesta JSON con mensaje de éxito o error
   */
  createOrder: (req, res) => {
    try {
      // Extraer datos del body
      const {
        customer,
        table_num,
        shippingAddress,
        items,
        status,
        total,
        comments,
      } = req.body;

      // Validar que existe el objeto customer
      if (!customer || typeof customer !== "object") {
        return res.status(400).json({
          success: false,
          message: "Se requiere información del cliente",
        });
      }

      // Extraer datos del cliente
      const { num_doc, full_name, email, num_phone } = customer;

      // Validaciones básicas
      if (!num_doc) {
        return res.status(400).json({
          success: false,
          message: "El número de documento del cliente es requerido",
        });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "Los items de la orden son requeridos y deben ser un array no vacío",
        });
      }

      if (total === undefined || total === null || isNaN(parseFloat(total))) {
        return res.status(400).json({
          success: false,
          message:
            "El total de la orden es requerido y debe ser un número válido",
        });
      }

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "El estado de la orden es requerido",
        });
      }

      // Crear objeto con datos para la orden
      const orderData = {
        num_doc,
        full_name,
        email,
        num_phone,
        table_num,
        shippingAddress,
        items,
        status,
        total,
        comments,
      };

      // Llamar al modelo para crear la orden
      pedido.createOrder(orderData, (err, result) => {
        if (err) {
          console.error("Error al crear la orden:", err);
          return res.status(500).json({
            success: false,
            message: "Error al crear la orden",
            error: err.message,
          });
        }

        return res.status(201).json({
          success: true,
          message: "Orden creada exitosamente",
          order_id: result.order_id,
        });
      });
    } catch (error) {
      console.error("Error en createOrder:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error.message,
      });
    }
  },

  /**
   * Actualiza una orden existente en la base de datos
   *
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} req.params - Parámetros de la URL
   * @param {string} req.params.id - ID de la orden a actualizar
   * @param {Object} req.body - Datos de la orden a actualizar
   * @param {Object} res - Objeto de respuesta Express
   *
   * @returns {JSON} - Respuesta JSON con mensaje de éxito o error
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

  /**
   * Elimina una orden existente en la base de datos
   *
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} req.params - Parámetros de la URL
   * @param {string} req.params.id - ID de la orden a eliminar
   * @param {Object} res - Objeto de respuesta Express
   *
   * @returns {JSON} - Respuesta JSON con mensaje de éxito o error
   */
  deleteOrder: (req, res) => {
    try {
      // Obtener el ID de la orden desde los parámetros
      const orderId = parseInt(req.params.id);

      if (!orderId || isNaN(orderId)) {
        return res.status(400).json({
          success: false,
          message: "ID de orden inválido",
        });
      }

      // Llamar al modelo para eliminar la orden
      pedido.deleteOrder(orderId, (err, result) => {
        if (err) {
          console.error("Error al eliminar la orden:", err);
          return res.status(500).json({
            success: false,
            message: "Error al eliminar la orden",
            error: err.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: `Pedido ${orderId} eliminado correctamente`,
          order_id: orderId,
        });
      });
    } catch (error) {
      console.error("Error en deleteOrder:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error.message,
      });
    }
  },
};

export default pedidoController;
