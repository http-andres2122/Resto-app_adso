const empleados = require("../models/empleadosModel");

const empleadosController = {
  // Obtener todos los empleados
  obtenerEmpleados: async (req, res) => {
    try {
      const emplo = await empleados.obtenerEmpleados();
      res.json(emplo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al buscar un empleado" });
    }
  },
  // Obtener un empleado por ID
  obtenerEmpleadoPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const emplo = await empleados.obtenerEmpleadoPorId(id);
      if (!emplo) {
        return res.status(404).json({ error: "Empleado no existe" });
      }
      res.json(emplo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al buscar un empleado" });
    }
  },

  // Crear un nuevo empleado
  crearEmpleado: async (req, res) => {
    empleados.crearEmpleado.userData = req.body;
    try {
      const newEmploId = await empleados.crearEmpleado({
        nombre,
        apellido,
        rol,
        fecha_contratacion,
        num_doc,
        tpe_doc,
        email,
        num_phone,
      });
      res.status(201).json({ id: newEmploId, nombre });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error al crear el empleado" });
    }
  },

  // Actualizar un empleado
  actualizarEmpleado: async (req, res) => {
    const { id } = req.params;
    empleados.crearEmpleado.userData = req.body;
    try {
      const affectedRows = await empleados.actualizarEmpleado(id, {
        nombre,
        apellido,
        rol,
        fecha_contratacion,
        num_doc,
        tpe_doc,
        email,
        num_phone,
      });
      if (affectedRows === 0) {
        return res.status(404).json({ error: "empleado no encontrado" });
      }
      res.status(200).json({ message: "empleado actualizado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "error al actualizar empleado" });
    }
  },

  // Eliminar un empleado
  eliminarEmpleado: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await empleados.eliminarEmpleado(id);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "empleado no disponible" });
      }
      res.status(200).json({ message: "empleado eliminado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error al eliminar empleado" });
    }
  },
};

module.exports = empleadosController;
