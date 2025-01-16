import express from "express";
import pagosController from "../../controllers/invoice/pagosController.js";
const router = express.Router();

// Ruta para obtener todos los pagos
router.get("/", pagosController.getAllPagos);

// Ruta para obtener un pago por su ID
router.get("/:id", pagosController.getPagoById);

// Ruta para crear un nuevo pago
router.post("/", pagosController.createPago);

// Ruta para actualizar un pago existente
router.put("//:id", pagosController.updatePago);

// Ruta para eliminar un pago
router.delete("/:id", pagosController.deletePago);

export default router;
