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
      u.full_name AS customer_username,
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
              username: order.customer_username,
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

  // Crear una orden
  createOrder: (orderData, callback) => {
    const { num_doc, username, num_phone, isDelivery, shippingAddress, items, total, comments } = orderData;
  
    // Paso 1: Cotejar o crear usuario
    connection.query('SELECT id FROM usuarios WHERE num_doc = ?', [num_doc], (err, result) => {
      if (err) return callback(err);
  
      let customer_id;
      if (result.length > 0) {
        customer_id = result[0].id; // Usuario existente
      } else {
        // Crear usuario pre-registrado
        connection.query(
          'INSERT INTO usuarios (num_doc, username, num_phone, is_fully_registered, role_id) VALUES (?, ?, ?, 0, 2)',
          [num_doc, username || `guest_${num_doc}`, num_phone], // Si no hay username, usa un valor temporal
          (err, result) => {
            if (err) return callback(err);
            customer_id = result.insertId;
            createOrderWithCustomer(customer_id);
          }
        );
        return;
      }
      createOrderWithCustomer(customer_id);
    });
  
    function createOrderWithCustomer(customer_id) {
      const table_id = isDelivery ? 1 : orderData.table_id; // 999 para "Domicilio"
      const sql = `
        INSERT INTO pedidos (table_id, customer_id, shippingAddress, items, total, status, comments)
        VALUES (?, ?, ?, ?, ?, 'pendiente', ?)
      `;
      connection.query(sql, [table_id, customer_id, shippingAddress, JSON.stringify(items), total, comments], (err, result) => {
        if (err) return callback(err);
        callback(null, { order_id: result.insertId });
      });
    }
  },

  

};



export default pedido;
