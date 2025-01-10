// mesas.js (Modelo)
import connection from "../config/db.js";

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
};

export default mesas;
