// routes/userRoutes.js
import express from "express";
const router = express.Router();
import usuarioController from "../controllers/usuarioController.js";

// const verifyToken = require("../middlewares/auth");

// Rutas para usuarios
router.get("/", usuarioController.getAllUsers); // Obtener todos los usuarios
router.get("/:id", usuarioController.getUserById); // Obtener un usuario por ID
router.post("/", usuarioController.createUser); // Crear un nuevo usuario
router.put("/:id", usuarioController.updateUser); // Actualizar un usuario
router.delete("/:id", usuarioController.deleteUser); // Eliminar un usuario
router.put("/upPasswd/:id", usuarioController.updatePassword); // Actualizar la contraseña de un usuario

export default router;
