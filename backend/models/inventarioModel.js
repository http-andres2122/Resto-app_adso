import connection from "../config/db.js";

//modelo para la tabla inventario
const inventario = {
  //obtener todos los productos
  getAllProductos: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM inventario", (err, results) => {
        !err ? resolve(results) : reject(err);
        {
          console.log(results);
        }
        {
          console.error("error:", err);
        }
      });
    });
  },

  //obtener un producto por ID
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM inventario WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            reject(err);
            console.error("error:", err);
          } else {
            resolve(results[0]);
            console.log(results[0]);
          }
        }
      );
    });
  },

  //crear un nuevo producto
  createProduct: (dataProducto) => {
    return new Promise((resolve, reject) => {
      const { producto_id, cantidad_actual } = dataProducto;
      const query =
        "INSERT INTO inventario (producto_id, cantidad_actual) VALUES (?, ?)";
      connection.query(
        query,
        [producto_id, cantidad_actual],
        (err, results) => {
          !err ? resolve(results) : reject(err);
          {
            console.log("producto creado con exito!", results);
          }
          {
            console.error("error al crear producto:", err);
          }
        }
      );
    });
  },

  //actualizar cantidad de un producto
  updateProduct: (id, dataProducto) => {
    return new Promise((resolve, reject) => {
      const { cantidad_actual } = dataProducto;
      const query = "UPDATE inventario SET cantidad_actual = ? WHERE id = ?";
      connection.query(query, [cantidad_actual, id], (err, results) => {
        if (err) {
          reject(err);
          console.error("error:", err);
        } else {
          resolve(results);
          console.log("Producto actualizado con exito!", results);
        }
      });
    });
  },

  //eliminar un producto
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM inventario WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            reject(err);
            console.error("error:", err);
          } else {
            resolve(results);
            console.log("Producto eliminado con exito!", results);
          }
        }
      );
    });
  },
};

export default inventario;
