// routes/pedidoRoutes.js
import express from "express";
const router = express.Router();
import pedidoController from "../../controllers/orders/pedidoController.js";

// Obtener órdenes con detalles
router.get("/", pedidoController.getOrdersForm);

// Crear un nuevo pedido
router.post("/", pedidoController.createOrder); //auth rute

// Actualizar un pedido existente
router.put("/:id", pedidoController.updateOrder);

// Eliminar un pedido
router.delete("/:id", pedidoController.deleteOrder);

export default router;
