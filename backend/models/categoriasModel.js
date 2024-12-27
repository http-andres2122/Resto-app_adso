// categoriaModel.js
const connection = require("../config/db");

const categorias = {
  // Obtener todas las categorías
  obtenerCategorias: (callback) => {
    connection.query("SELECT * FROM categorias", callback);
  },

  // Obtener una categoría por ID
  obtenerCategoriaPorId: (id, callback) => {
    connection.query("SELECT * FROM categorias WHERE id = ?", [id], callback);
  },

  // Crear una nueva categoría
  crearCategoria: (nombre, callback) => {
    connection.query(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre],
      callback
    );
  },

  // Actualizar una categoría existente
  actualizarCategoria: (id, nombre, callback) => {
    connection.query(
      "UPDATE categorias SET nombre = ? WHERE id = ?",
      [nombre, id],
      callback
    );
  },

  // Eliminar una categoría
  eliminarCategoria: (id, callback) => {
    connection.query("DELETE FROM categorias WHERE id = ?", [id], callback);
  },
};

module.exports = categorias;
