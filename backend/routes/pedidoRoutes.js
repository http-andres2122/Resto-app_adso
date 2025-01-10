// routes/pedidoRoutes.js
import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import role from "../middlewares/role.js";
import pedidoController from "../controllers/pedidoController.js";
// Importamos el controlador de pedidos

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

export default router;
