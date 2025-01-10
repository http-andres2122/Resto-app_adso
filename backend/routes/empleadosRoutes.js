import express from "express";
const router = express.Router();
import empleadosController from "../controllers/empleadosController.js";

// Obtener todos los empleados
router.get("/", empleadosController.obtenerEmpleados);

// Obtener un empleado por su ID
router.get("/:id", empleadosController.obtenerEmpleadoPorId);

// Crear un nuevo empleado
router.post("/", empleadosController.crearEmpleado);

// Actualizar un empleado
router.put("/:id", empleadosController.actualizarEmpleado);

// Eliminar un empleado
router.delete("/:id", empleadosController.eliminarEmpleado);

export default router;
