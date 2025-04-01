// mesas.js (Modelo)
import connection from "../../config/db.js";

const mesas = {
  obtenerMesas: (callback) => {
    connection.query("SELECT * FROM mesas", callback);
  },

  obtenerMesaPorId: (id, callback) => {
    connection.query("SELECT * FROM mesas WHERE id = ?", [id], callback);
  },

  crearMesa: (numero, capacidad, callback) => {
    connection.query(
      "INSERT INTO mesas (numero, capacidad) VALUES (?, ?)",
      [numero, capacidad],
      callback
    );
  },

  actualizarMesa: (id, numero, capacidad, callback) => {
    connection.query(
      "UPDATE mesas SET numero = ?, capacidad = ? WHERE id = ?",
      [numero, capacidad, id],
      callback
    );
  },

  eliminarMesa: (id, callback) => {
    connection.query("DELETE FROM mesas WHERE id = ?", [id], callback);
  },

  /* 
  New methods and fuctions for products 
  */

  getTables: (callback) => {
    const sql = `
      SELECT 
        m.id AS table_id,
        m.numero AS table_number,
        m.capacidad AS table_capacity,
        m.estado AS table_status,
        r.id AS reservation_id,
        r.fecha_reserva AS reservation_date,
        r.hora_reserva AS reservation_time,
        r.usuario_id AS reservation_user_id
      FROM 
        mesas m
      LEFT JOIN 
        reservas r ON m.id = r.mesa_id;
    `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }
  
      // Transformar los resultados
      const tables = result.map((row) => {
        const table = {
          id: row.table_id,
          number: row.table_number,
          capacity: row.table_capacity,
          status: row.table_status, // Usamos el estado de la tabla directamente
        };
  
        if (row.reservation_id) {
          table.reservation = {
            id: row.reservation_id,
            date: row.reservation_date,
            time: row.reservation_time,
            user_id: row.reservation_user_id,
          };
        }
  
        return table;
      });
  
      return callback(null, { tables });
    });
  },
};

export default mesas;
