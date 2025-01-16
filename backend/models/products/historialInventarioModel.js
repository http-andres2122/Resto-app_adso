// models/historialInventarioModel.js
import db from "../../config/db.js"; // Configuración de la conexión a la base de datos

const historialInventarioModel = {
  async getAll() {
    const query = "SELECT * FROM historial_inventario";
    const [rows] = await db.promise().query(query);
    return rows;
  },

  async getById(id) {
    const query = "SELECT * FROM historial_inventario WHERE id = ?";
    const [rows] = await db.promise().query(query, [id]);
    return rows[0];
  },

  async create(data) {
    const query = `
      INSERT INTO historial_inventario (producto_id, cantidad_cambiada, motivo, fecha_cambio)
      VALUES (?, ?, ?, ?)
    `;
    const { producto_id, cantidad_cambiada, motivo, fecha_cambio } = data;
    const [result] = await db
      .promise()
      .query(query, [producto_id, cantidad_cambiada, motivo, fecha_cambio]);
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const query = `
      UPDATE historial_inventario
      SET producto_id = ?, cantidad_cambiada = ?, motivo = ?, fecha_cambio = ?
      WHERE id = ?
    `;
    const { producto_id, cantidad_cambiada, motivo, fecha_cambio } = data;
    await db
      .promise()
      .query(query, [producto_id, cantidad_cambiada, motivo, fecha_cambio, id]);
    return { id, ...data };
  },

  async delete(id) {
    const query = "DELETE FROM historial_inventario WHERE id = ?";
    await db.promise().query(query, [id]);
  },
};

export default historialInventarioModel;
