// routes/menuRoutes.js
import express from "express";
const router = express.Router();
import menuController from "../controllers/menuController.js";
// Importamos el controlador de menú

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

export default router;
