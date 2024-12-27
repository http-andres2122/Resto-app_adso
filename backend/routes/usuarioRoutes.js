// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// Rutas para usuarios
router.get("/", usuarioController.getAllUsers); // Obtener todos los usuarios
router.get("/:id", usuarioController.getUserById); // Obtener un usuario por ID
router.post("/", usuarioController.createUser); // Crear un nuevo usuario
router.put("/:id", usuarioController.updateUser); // Actualizar un usuario
router.delete("/:id", usuarioController.deleteUser); // Eliminar un usuario

module.exports = router;
