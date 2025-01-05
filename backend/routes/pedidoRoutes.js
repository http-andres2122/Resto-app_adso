// routes/pedidoRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const pedidoController = require("../controllers/pedidoController"); // Importamos el controlador de pedidos

// Obtener todos los pedidos
router.get("/", pedidoController.obtenerPedidos); //auth and role

// Obtener un pedido por ID
router.get("/:id", pedidoController.obtenerPedidoPorId);

// Crear un nuevo pedido
router.post("/", pedidoController.crearPedido); //auth rute

// Actualizar un pedido existente
router.put("/:id", pedidoController.actualizarPedido);

// Eliminar un pedido
router.delete("/:id", pedidoController.eliminarPedido);

module.exports = router;
