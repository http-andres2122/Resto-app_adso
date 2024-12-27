// mesasRoutes.js (Rutas)
const express = require("express");
const router = express.Router();
const mesasController = require("../controllers/mesasController");

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

module.exports = router;
