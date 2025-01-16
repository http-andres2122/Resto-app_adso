// models/facturacion.js
import connection from "../../config/db.js";
// Conexión a la base de datos

const facturacion = {
  obtenerFacturas: (callback) => {
    connection.query("SELECT * FROM facturacion", callback);
  },

  obtenerFacturaPorId: (id, callback) => {
    connection.query("SELECT * FROM facturacion WHERE id = ?", [id], callback);
  },

  crearFactura: (pedido_id, total, callback) => {
    connection.query(
      "INSERT INTO facturacion (pedido_id, total) VALUES (?, ?)",
      [pedido_id, total],
      callback
    );
  },

  actualizarFactura: (id, total, callback) => {
    connection.query(
      "UPDATE facturacion SET total = ? WHERE id = ?",
      [total, id],
      callback
    );
  },

  eliminarFactura: (id, callback) => {
    connection.query("DELETE FROM facturacion WHERE id = ?", [id], callback);
  },
};

export default facturacion;
