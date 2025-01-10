// models/userModel.js
import connection from "../config/db.js";
import hashPassword from "../utils/hash.js";

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

  // Obtener un usuario por email
  findUserByEmail: async (email) => {
    try {
      const query = "SELECT * FROM usuarios WHERE email = ?";
      const [rows] = await connection.promise().execute(query, [email]);
      if (rows.length > 0) {
        return rows[0]; // Retorna el primer usuario que coincida con el email
      } else {
        return null; // Si no se encuentra el usuario, retorna null
      }
    } catch (error) {
      throw new Error("Error al buscar el usuario por email: " + error.message);
    }
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
  createUser: async (userData) => {
    try {
      const {
        username,
        email,
        password,
        first_name = null,
        last_name = null,
        num_doc = null,
        tpe_doc = null,
        num_phone,
      } = userData;
      //hash password
      const pwdhash = await hashPassword(password);
      //query in sql
      const query =
        "INSERT INTO usuarios (username, email, password_hash, first_name, last_name, num_doc, tpe_doc, num_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      //connect to db
      const [results] = await connection
        .promise()
        .query(query, [
          username,
          email,
          pwdhash,
          first_name,
          last_name,
          num_doc,
          tpe_doc,
          num_phone,
        ]);
      return results.insertId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // Actualizar un usuario existente
  updateUser: (id, userData) => {
    return new Promise((resolve, reject) => {
      const {
        username,
        email,
        first_name,
        last_name,
        num_doc,
        tpe_doc,
        num_phone,
      } = userData;
      const query =
        "UPDATE usuarios SET username = ?, email = ?, first_name = ?, last_name = ?, num_doc = ?, tpe_doc = ?, num_phone = ? WHERE id = ?";
      connection.query(
        query,
        [
          username,
          email,
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

  //update password
  updatePassword: async (id, newPassword) => {
    try {
      // Hash password
      const hash = await hashPassword(newPassword);

      // Usando mysql2 con promesas
      const [results] = await connection
        .promise()
        .query("UPDATE usuarios SET password_hash = ? WHERE id = ?", [
          hash,
          id,
        ]);

      // Devuelve el número de filas afectadas
      return results.affectedRows;
    } catch (error) {
      console.log(error);
      throw error; // Se lanza el error para que lo maneje el manejador global de errores
    }
  },
};

export default usuario;
