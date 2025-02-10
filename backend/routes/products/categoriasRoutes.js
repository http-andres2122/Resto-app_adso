// categoriaRoutes.js
import express from "express";
const router = express.Router();
import categoriaController from "../../controllers/products/categoriasController.js";

// Obtener todas las categorías
router.get("/", categoriaController.obtenerCategorias);

// Obtener una categoría por ID
router.get("/:id", categoriaController.obtenerCategoriaPorId);

// Crear una nueva categoría
router.post("/createCategory", categoriaController.crearCategoria);

// Actualizar una categoría existente
router.put("/updateCategory/:id", categoriaController.actualizarCategoria);

// Eliminar una categoría
router.delete("/deleteCategory/:id", categoriaController.eliminarCategoria);

export default router;
