// models/userModel.js
const connection = require("../config/db");

// Modelo para la tabla de usuarios
const usuario = {
  // Obtener todos los usuarios
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM usuarios", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Obtener un usuario por ID
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
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

  // Crear un nuevo usuario
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      const {
        username,
        email,
        password_hash,
        first_name,
        last_name,
        num_doc,
        tpe_doc,
        num_phone,
      } = userData;
      const query =
        "INSERT INTO usuarios (username, email, password_hash, first_name, last_name, num_doc, tpe_doc, num_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        query,
        [
          username,
          email,
          password_hash,
          first_name,
          last_name,
          num_doc,
          tpe_doc,
          num_phone,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  },

  // Actualizar un usuario existente
  updateUser: (id, userData) => {
    return new Promise((resolve, reject) => {
      const {
        username,
        email,
        password_hash,
        first_name,
        last_name,
        num_doc,
        tpe_doc,
        num_phone,
      } = userData;
      const query =
        "UPDATE usuarios SET username = ?, email = ?, password_hash = ?, first_name = ?, last_name = ?, num_doc = ?, tpe_doc = ?, num_phone = ? WHERE id = ?";
      connection.query(
        query,
        [
          username,
          email,
          password_hash,
          first_name,
          last_name,
          num_doc,
          tpe_doc,
          num_phone,
          id,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  },

  // Eliminar un usuario
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  },
};

module.exports = usuario;
