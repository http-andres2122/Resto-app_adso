// mesasRoutes.js (Rutas)
import express from "express";
const router = express.Router();
import mesasController from "../../controllers/orders/mesasController.js";

// Obtener todas las mesas
router.get("/", mesasController.obtenerMesas);

// Obtener una mesa por ID
router.get("/:id", mesasController.obtenerMesaPorId);

// Crear una nueva mesa
router.post("/", mesasController.crearMesa);

// Actualizar una mesa existente
router.put("/:id", mesasController.actualizarMesa);

// Eliminar una mesa
router.delete("/:id", mesasController.eliminarMesa);

export default router;
