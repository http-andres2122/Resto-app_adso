// routes/facturacionRoutes.js
import express from "express";
const router = express.Router();
import facturacionController from "../../controllers/invoice/facturacionController.js"; // Importamos el controlador de facturación

// Obtener todas las facturas
router.get("/", facturacionController.obtenerFacturas);

// Obtener una factura por ID
router.get("/:id", facturacionController.obtenerFacturaPorId);

// Crear una nueva factura
router.post("/", facturacionController.crearFactura);

// Actualizar una factura existente
router.put("/:id", facturacionController.actualizarFactura);

// Eliminar una factura
router.delete("/:id", facturacionController.eliminarFactura);

export default router;
