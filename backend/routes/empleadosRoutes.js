const express = require("express");
const router = express.Router();
const empleadosController = require("../controllers/empleadosController");

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

module.exports = router;
