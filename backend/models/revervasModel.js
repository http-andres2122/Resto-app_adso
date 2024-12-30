const db = require("../config/db"); // Asegúrate de importar tu conexión con la base de datos

// Modelo para obtener todas las reservas
const getAllReservas = async () => {
  const [rows] = await db.promise().query("SELECT * FROM reservas");
  return rows;
};

// Modelo para obtener una reserva por su ID
const getReservaById = async (id) => {
  const [rows] = await db.query("SELECT * FROM reservas WHERE id = ?", [id]);
  return rows[0]; // Devuelve el primer resultado (o null si no se encuentra)
};

// Modelo para crear una nueva reserva
const createReserva = async (
  mesa_id,
  fecha_reserva,
  hora_reserva,
  usuario_id
) => {
  const [result] = await db.query(
    "INSERT INTO reservas (mesa_id, fecha_reserva, hora_reserva, usuario_id) VALUES (?, ?, ?, ?)",
    [mesa_id, fecha_reserva, hora_reserva, usuario_id]
  );
  return result.insertId; // Devuelve el ID de la reserva recién creada
};

// Modelo para actualizar una reserva
const updateReserva = async (
  id,
  mesa_id,
  fecha_reserva,
  hora_reserva,
  usuario_id
) => {
  await db.query(
    "UPDATE reservas SET mesa_id = ?, fecha_reserva = ?, hora_reserva = ?, usuario_id = ? WHERE id = ?",
    [mesa_id, fecha_reserva, hora_reserva, usuario_id, id]
  );
  return id; // Devuelve el ID de la reserva actualizada
};

// Modelo para eliminar una reserva
const deleteReserva = async (id) => {
  await db.query("DELETE FROM reservas WHERE id = ?", [id]);
  return id; // Devuelve el ID de la reserva eliminada
};

module.exports = {
  getAllReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
};
