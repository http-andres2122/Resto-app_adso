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

  eliminarPedido: (id) => {
    connection.query("DELETE FROM pedidos WHERE id = ?", [id], callback);
  },

  /* 
  New methods and fuctions for products 
  */

  // Obtener órdenes
  getOrdersForm: (callback) => {
    const sql = `
    SELECT 
      p.id,
      p.table_id,
      m.numero AS table_number,
      m.capacidad AS table_capacity,
      p.customer_id,
      u.email AS customer_email,
      u.first_name AS customer_first_name,
      u.last_name AS customer_last_name,
      u.num_doc AS customer_num_doc,
      u.num_phone AS customer_num_phone,
      p.shippingAddress,
      p.items,
      p.total,
      p.fecha,
      p.status,
      p.comments
    FROM 
      pedidos p
    LEFT JOIN 
      mesas m ON p.table_id = m.id
    LEFT JOIN 
      usuarios u ON p.customer_id = u.id;`;

    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      // Transformar los resultados
      const transformedOrders = result.map((order) => ({
        id: order.id,
        table: order.table_id
          ? [
              {
                id: order.table_id,
                number: order.table_number,
                capacity: order.table_capacity,
              },
            ]
          : [], // Si no hay table_id, devuelve un array vacío
        customer: order.customer_id
          ? {
              id: order.customer_id,
              email: order.customer_email,
              first_name: order.customer_first_name,
              last_name: order.customer_last_name,
              num_doc: order.customer_num_doc,
              num_phone: order.customer_num_phone,
            }
          : null, // Si no hay customer_id, devuelve null
        shippingAddress: order.shippingAddress,
        items: order.items, // Ya es JSON, no necesita transformación adicional
        total: order.total,
        date: order.fecha,
        status: order.status,
        comments: order.comments,
      }));
      // Envolver las órdenes en un objeto con la clave "orders"
      const response = { orders: transformedOrders };

      return callback(null, response);
    });
  },
};

export default pedido;
