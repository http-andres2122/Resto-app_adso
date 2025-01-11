import express from "express";
import reservasController from "../../controllers/orders/reservasController.js";
const router = express.Router();

// Ruta para obtener todas las reservas
// router.get("/", reservasController.getAllReservas);

// Ruta para obtener una reserva por su ID
router.get("/:id", reservasController.getReservaById);

// Ruta para crear una nueva reserva
router.post("/", reservasController.createReserva);

// Ruta para actualizar una reserva existente
router.put("/:id", reservasController.updateReserva);

// Ruta para eliminar una reserva
router.delete("/:id", reservasController.deleteReserva);

export default router;
