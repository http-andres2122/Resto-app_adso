// models/menu.js
import connection from "../../config/db.js";
// Conexión a la base de datos

const menu = {
  obtenerMenu: (callback) => {
    connection.query("SELECT * FROM menu", callback);
  },

  obtenerMenuPorId: (id, callback) => {
    connection.query("SELECT * FROM menu WHERE id = ?", [id], callback);
  },

  agregarProductoAlMenu: (producto_id, disponible, callback) => {
    connection.query(
      "INSERT INTO menu (producto_id, disponible) VALUES (?, ?)",
      [producto_id, disponible],
      callback
    );
  },

  actualizarProductoEnMenu: (id, disponible, callback) => {
    connection.query(
      "UPDATE menu SET disponible = ? WHERE id = ?",
      [disponible, id],
      callback
    );
  },

  eliminarProductoDelMenu: (id, callback) => {
    connection.query("DELETE FROM menu WHERE id = ?", [id], callback);
  },
};

export default menu;
