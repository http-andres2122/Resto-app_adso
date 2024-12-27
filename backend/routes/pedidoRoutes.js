// routes/pedidoRoutes.js
const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController"); // Importamos el controlador de pedidos

// Obtener todos los pedidos
router.get("/", pedidoController.obtenerPedidos);

// Obtener un pedido por ID
router.get("/:id", pedidoController.obtenerPedidoPorId);

// Crear un nuevo pedido
router.post("/", pedidoController.crearPedido);

// Actualizar un pedido existente
router.put("/:id", pedidoController.actualizarPedido);

// Eliminar un pedido
router.delete("/:id", pedidoController.eliminarPedido);

module.exports = router;
