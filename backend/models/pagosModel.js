const db = require("../config/db"); // Asegúrate de importar tu conexión con la base de datos

// Modelo para obtener todos los pagos
const getAllPagos = async () => {
  const [rows] = await db.promise().query("SELECT * FROM pagos");
  return rows;
};

// Modelo para obtener un pago por su ID
const getPagoById = async (id) => {
  const [rows] = await db.query("SELECT * FROM pagos WHERE id = ?", [id]);
  return rows[0]; // Devuelve el primer resultado (o null si no se encuentra)
};

// Modelo para crear un nuevo pago
const createPago = async (monto, fecha_pago, metodo_pago, reserva_id) => {
  const [result] = await db.query(
    "INSERT INTO pagos (monto, fecha_pago, metodo_pago, reserva_id) VALUES (?, ?, ?, ?)",
    [monto, fecha_pago, metodo_pago, reserva_id]
  );
  return result.insertId; // Devuelve el ID del pago recién creado
};

// Modelo para actualizar un pago
const updatePago = async (id, monto, fecha_pago, metodo_pago, reserva_id) => {
  await db.query(
    "UPDATE pagos SET monto = ?, fecha_pago = ?, metodo_pago = ?, reserva_id = ? WHERE id = ?",
    [monto, fecha_pago, metodo_pago, reserva_id, id]
  );
  return id; // Devuelve el ID del pago actualizado
};

// Modelo para eliminar un pago
const deletePago = async (id) => {
  await db.query("DELETE FROM pagos WHERE id = ?", [id]);
  return id; // Devuelve el ID del pago eliminado
};

module.exports = {
  getAllPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago,
};
