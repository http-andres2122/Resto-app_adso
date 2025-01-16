import db from "../../config/db.js";

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

  // get products with category
  getWithCategory: (callback) => {
    db.query(
      "SELECT productos.*, categorias.nombre AS categoria_nombre FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id",
      (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results);
      }
    );
  },

  //get products with category by product ID
  getWithCategoryProductId: (id, callback) => {
    db.query(
      "SELECT productos.id AS producto_id,productos.nombre AS producto_nombre,productos.precio AS producto_precio, productos.categoria_id, categorias.id AS categoria_id, categorias.nombre AS categoria_nombre FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id WHERE productos.id = ?",
      [id],
      (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
      }
    );
  },

  //get products with category by category ID
  getWithCategoryCategoryId: (id, callback) => {
    db.query(
      "SELECT productos.id AS producto_id,productos.nombre AS producto_nombre,productos.precio AS producto_precio, productos.categoria_id, categorias.id AS categoria_id, categorias.nombre AS categoria_nombre FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id WHERE categorias.id = ?",
      [id],
      (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
      }
    );
  },
};

export default productos;
