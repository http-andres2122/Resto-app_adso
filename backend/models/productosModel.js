import db from "../config/db.js";

// Modelo para la tabla de productos
const productos = {
  getAll: (callback) => {
    db.query("SELECT * FROM productos", (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM productos WHERE id = ?", [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  create: (data, callback) => {
    db.query("INSERT INTO productos SET ?", [data], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE productos SET ? WHERE id = ?",
      [data, id],
      (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM productos WHERE id = ?", [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },
};

export default productos;
