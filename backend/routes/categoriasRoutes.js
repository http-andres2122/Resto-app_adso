// categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriasController');

// Obtener todas las categorías
router.get('/', categoriaController.obtenerCategorias);

// Obtener una categoría por ID
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// Crear una nueva categoría
router.post('/', categoriaController.crearCategoria);

// Actualizar una categoría existente
router.put('/:id', categoriaController.actualizarCategoria);

// Eliminar una categoría
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
