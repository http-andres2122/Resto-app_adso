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
  New methods and functions for products 
  */

  // Obtener órdenes
  getOrdersForm: (callback) => {
    const sql = `
    SELECT 
      p.id,
      p.table_num,
      p.customer_id,
      u.email AS customer_email,
      u.full_name AS customer_full_name,
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
      usuarios u ON p.customer_id = u.id;`;

    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      // Transformar los resultados
      const transformedOrders = result.map((order) => ({
        id: order.id,
        table_num: order.table_num,
        shippingAddress: order.shippingAddress,
        items: order.items, // Ya es JSON, no necesita transformación adicional
        total: order.total,
        date: order.fecha,
        status: order.status,
        comments: order.comments,
        customer: order.customer_id
          ? {
              id: order.customer_id,
              email: order.customer_email,
              full_name: order.customer_full_name,
              num_doc: order.customer_num_doc,
              num_phone: order.customer_num_phone,
            }
          : null, // Si no hay customer_id, devuelve null
      }));
      // Envolver las órdenes en un objeto con la clave "orders"
      const response = { orders: transformedOrders };

      return callback(null, response);
    });
  },

  // Crear una orden
  createOrder: (orderData, callback) => {
    const {
      num_doc,
      full_name,
      email,
      num_phone,
      table_num,
      shippingAddress,
      items,
      total,
      comments,
      status = "pendiente", // Valor por defecto si no se proporciona
    } = orderData;

    // Paso 1: Cotejar o crear usuario
    connection.query(
      "SELECT id FROM usuarios WHERE num_doc = ?",
      [num_doc],
      (err, result) => {
        if (err) return callback(err);

        let customer_id;
        if (result.length > 0) {
          customer_id = result[0].id; // Usuario existente
        } else {
          // Crear usuario pre-registrado
          connection.query(
            "INSERT INTO usuarios (num_doc, full_name, email, num_phone, is_fully_registered, role_id) VALUES (?, ?, ?, ?, 0, 2)",
            [
              num_doc,
              full_name || `guest_${num_doc}`,
              email || null,
              num_phone || null,
            ], // Si no hay full_name, usa un valor temporal
            (err, result) => {
              if (err) return callback(err);
              customer_id = result.insertId;
              createOrderWithCustomer(customer_id);
            }
          );
          return;
        }
        createOrderWithCustomer(customer_id);
      }
    );

    function createOrderWithCustomer(customer_id) {
      const sql = `
        INSERT INTO pedidos (table_num, customer_id, shippingAddress, items, total, status, comments)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [
          table_num,
          customer_id,
          shippingAddress,
          JSON.stringify(items),
          total,
          status,
          comments,
        ],
        (err, result) => {
          if (err) return callback(err);
          callback(null, { order_id: result.insertId });
        }
      );
    }
  },

  // NUEVO MÉTODO: Actualizar una orden existente
  updateOrder: (orderData, callback) => {
    // Verificar si existe el pedido con el ID proporcionado
    connection.query(
      "SELECT id FROM pedidos WHERE id = ?",
      [orderData.id],
      (err, result) => {
        if (err) return callback(err);

        // Si no existe el pedido, devolver error
        if (result.length === 0) {
          return callback(
            new Error(`No existe pedido con el ID ${orderData.id}`)
          );
        }

        // Preparar los datos para actualizar
        const {
          id,
          table_num,
          customer_id,
          status,
          comments,
          shippingAddress,
          total,
          items,
        } = orderData;

        // Asegurarse de que items sea un string JSON si es un objeto
        const itemsToSave =
          typeof items === "string" ? items : JSON.stringify(items);

        // Consulta SQL para actualizar el pedido
        const sql = `
          UPDATE pedidos
          SET 
            table_num = ?,
            customer_id = ?,
            status = ?,
            comments = ?,
            shippingAddress = ?,
            total = ?,
            items = ?
          WHERE id = ?
        `;

        // Ejecutar la actualización
        connection.query(
          sql,
          [
            table_num,
            customer_id,
            status,
            comments || "",
            shippingAddress || "",
            total,
            itemsToSave,
            id,
          ],
          (err, result) => {
            if (err) return callback(err);

            // Verificar si se actualizó correctamente
            if (result.affectedRows === 0) {
              return callback(
                new Error(`No se pudo actualizar el pedido con ID ${id}`)
              );
            }

            // Devolver éxito
            callback(null, {
              success: true,
              message: `Pedido ${id} actualizado correctamente`,
              order_id: id,
            });
          }
        );
      }
    );
  },
};

export default pedido;
