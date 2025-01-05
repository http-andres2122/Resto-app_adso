// routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController"); // Importamos el controlador de menú

// Obtener todo el menú
// router.get("/", menuController.obtenerMenu);

// Obtener un producto del menú por ID
router.get("/:id", menuController.obtenerMenuPorId);

// Agregar un producto al menú
router.post("/", menuController.agregarProductoAlMenu);

// Actualizar un producto en el menú
router.put("/:id", menuController.actualizarProductoEnMenu);

// Eliminar un producto del menú
router.delete("/:id", menuController.eliminarProductoDelMenu);

module.exports = router;
