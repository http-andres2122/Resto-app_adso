// iventarioRoutes.js
import express from "express";
const router = express.Router();
import inventarioController from "../controllers/inventarioController.js";

// Rutas para inventario
router.get("/", inventarioController.getAllProductos); // Obtener todos los productos
router.get("/:id", inventarioController.getProductById); // Obtener un producto por ID
router.post("/", inventarioController.createProduct); // Crear un nuevo producto
router.put("/:id", inventarioController.updateProduct); // Actualizar un producto
router.delete("/:id", inventarioController.deletedPrduct); // Eliminar un producto

export default router;
