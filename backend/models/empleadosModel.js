// models/empleadosModel.js
const { query } = require("express");
const connection = require("../config/db");

const empleados = {
  // Obtener todos los empleados
  obtenerEmpleados: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM empleados", (err, results) => {
        !err ? resolve(results) : reject(err);
      });
    });
  },

  // Obtener un empleado por ID
  obtenerEmpleadoPorId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM empleados WHERE id = ?"[id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },

  // Crear un nuevo empleado
  crearEmpleado: (usarData) => {
    return new Promise((resolve, reject) => {
      const {
        nombre,
        apellido,
        rol,
        fecha_contratacion,
        num_doc,
        tpe_doc,
        email,
        num_phone,
      } = userData;
      const query =
        "INSERT INTO empleados (nombre, apellido, rol, fecha_contratacion, num_doc, tpe_doc, email, num_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        query,
        [
          nombre,
          apellido,
          rol,
          fecha_contratacion,
          num_doc,
          tpe_doc,
          email,
          num_phone,
        ],
        (err, result) => {
          !err ? resolve(result) : reject(err);
          {
            console.error("Error al crear empleado:", err);
          }
        }
      );
    });
  },
  // Actualizar un empleado
  actualizarEmpleado: (id, userData) => {
    return new Promise((resolve, reject) => {
      const {
        nombre,
        apellido,
        rol,
        fecha_contratacion,
        num_doc,
        tpe_doc,
        email,
        num_phone,
      } = userData;
      const query =
        "UPDATE empleados SET nombre = ?, apellido = ?, rol = ?, fecha_contratacion = ?, num_doc = ?, tpe_doc = ?, email = ?, num_phone = ? WHERE id = ?";
      connection.query(
        query,
        [
          nombre,
          apellido,
          rol,
          fecha_contratacion,
          num_doc,
          tpe_doc,
          email,
          num_phone,
          id,
        ],
        (err, result) => {
          !err ? resolve(result) : reject(err);
          {
            console.error("Error al actualizar empleado:", err);
          }
        }
      );
    });
  },

  // Eliminar un empleado
  eliminarEmpleado: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM empleados WHERE id = ?",
        [id],
        (err, result) => {
          !err ? resolve(result) : reject(err);
          {
            console.error("error al eliminar un usuario:", err);
          }
        }
      );
    });
  },
};

module.exports = empleados;
