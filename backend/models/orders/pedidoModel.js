// models/pedido.js
import connection from "../../config/db.js"; // Conexión a la base de datos

const pedido = {
  obtenerPedidos: (callback) => {
    connection.query("SELECT * FROM pedidos", callback);
  },

  obtenerPedidoPorId: (id, callback) => {
    connection.query("SELECT * FROM pedidos WHERE id = ?", [id], callback);
  },

  crearPedido: (mesa_id, usuario_id, estado, observaciones, callback) => {
    connection.query(
      "INSERT INTO pedidos (mesa_id, usuario_id, estado, observaciones) VALUES (?, ?, ?, ?)",
      [mesa_id, usuario_id, estado, observaciones],
      callback
    );
  },

  actualizarPedido: (id, estado, observaciones, callback) => {
    connection.query(
      "UPDATE pedidos SET estado = ?, observaciones = ? WHERE id = ?",
      [estado, observaciones, id],
      callback
    );
  },

  eliminarPedido: (id, callback) => {
    connection.query("DELETE FROM pedidos WHERE id = ?", [id], callback);
  },
};

export default pedido;
