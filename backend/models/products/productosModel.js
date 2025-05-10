import db from "../../config/db.js";

// Modelo para la tabla de productos
const productos = {
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

  /* 
  New methods and fuctions for products 
  */

  /**
   * Obtiene todos los productos junto con su stock y la información de la categoría.
   * @param {function} callback - Función callback para manejar el resultado.
   */
  getAllWithStock: (callback) => {
    const sql = `
    SELECT 
      p.id, 
      p.nombre, 
      p.descripcion, 
      p.precio, 
      p.categoria_id, 
      c.nombre AS categoria_nombre, 
      i.cantidad_actual AS stock
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN inventario i ON p.id = i.producto_id;
  `;

    db.query(sql, (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    });
  },

  /**
   * Agrega un producto junto con su inventario inicial.
   * @param {string} nombre - Nombre del producto.
   * @param {string} descripcion - Descripción del producto.
   * @param {number} precio - Precio del producto.
   * @param {number} categoriaId - ID de la categoría (debe existir en la tabla 'categorias').
   * @param {number} cantidadInicial - Cantidad inicial para el inventario.
   * @param {function} callback - Función callback para manejar el resultado.
   */
  addProduct: (
    nombre,
    descripcion,
    precio,
    categoriaId,
    cantidadInicial,
    callback
  ) => {
    // Iniciar una transacción
    db.beginTransaction((err) => {
      if (err) return callback(err, null);

      // 0. Validar si el producto ya existe (por nombre)
      db.query(
        "SELECT id FROM productos WHERE nombre = ? LIMIT 1",
        [nombre],
        (err, productosExistentes) => {
          if (err) {
            return db.rollback(() => callback(err, null));
          }

          if (productosExistentes.length > 0) {
            return db.rollback(() =>
              callback(
                new Error("El producto ya existe en la base de datos."),
                null
              )
            );
          }

          // 1. Buscar el ID de la categoría por nombre
          db.query(
            "SELECT id FROM categorias WHERE id = ? LIMIT 1",
            [categoriaId],
            (err, categorias) => {
              if (err) {
                return db.rollback(() => callback(err, null));
              }

              if (categorias.length === 0) {
                return db.rollback(() =>
                  callback(
                    new Error("La categoría especificada no existe."),
                    null
                  )
                );
              }

              // 2. Insertar el nuevo producto
              db.query(
                "INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)",
                [nombre, descripcion, precio, categoriaId],
                (err, resultProducto) => {
                  if (err) {
                    return db.rollback(() => callback(err, null));
                  }

                  const productoId = resultProducto.insertId;

                  // 3. Insertar el registro en inventario para el nuevo producto
                  db.query(
                    "INSERT INTO inventario (producto_id, cantidad_actual, fecha_ultima_actualizacion) VALUES (?, ?, NOW())",
                    [productoId, cantidadInicial],
                    (err) => {
                      if (err) {
                        return db.rollback(() => callback(err, null));
                      }

                      // 4. Confirmar la transacción
                      db.commit((err) => {
                        if (err) {
                          return db.rollback(() => callback(err, null));
                        }
                        callback(null, {
                          message: "Producto agregado correctamente",
                          productoId,
                        });
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  },

  /**
   * Actualiza un producto y su stock en la base de datos.
   * @param {number} productoId - ID del producto a actualizar.
   * @param {string} nombre - Nuevo nombre del producto.
   * @param {string} descripcion - Nueva descripción del producto.
   * @param {number} precio - Nuevo precio del producto.
   * @param {number} categoriaId - Nueva categoría del producto (opcional, debe existir).
   * @param {number} nuevaCantidad - Nueva cantidad en inventario (opcional).
   * @param {function} callback - Función callback para manejar el resultado.
   */
  updateProduct: (
    productoId,
    nombre,
    descripcion,
    precio,
    categoriaId,
    nuevaCantidad,
    callback
  ) => {
    db.beginTransaction((err) => {
      if (err) return callback(err, null);

      // Verificar si el producto existe
      db.query(
        "SELECT * FROM productos WHERE id = ?",
        [productoId],
        (err, productos) => {
          if (err) return db.rollback(() => callback(err, null));
          if (productos.length === 0) {
            return db.rollback(() =>
              callback(new Error("El producto no existe."), null)
            );
          }

          // Verificar si la categoría existe (si se proporciona un cambio de categoría)
          if (categoriaId) {
            db.query(
              "SELECT id FROM categorias WHERE id = ?",
              [categoriaId],
              (err, categorias) => {
                if (err) return db.rollback(() => callback(err, null));
                if (categorias.length === 0) {
                  return db.rollback(() =>
                    callback(new Error("La categoría no existe."), null)
                  );
                }

                actualizarProducto();
              }
            );
          } else {
            actualizarProducto();
          }

          function actualizarProducto() {
            // Actualizar la información del producto
            db.query(
              "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?",
              [
                nombre,
                descripcion,
                precio,
                categoriaId || productos[0].categoria_id,
                productoId,
              ],
              (err, result) => {
                if (err) return db.rollback(() => callback(err, null));

                // Si no hay cambio de cantidad, finalizar la transacción
                if (nuevaCantidad === undefined) {
                  return db.commit((err) => {
                    if (err) return db.rollback(() => callback(err, null));
                    callback(null, {
                      message: "Producto actualizado correctamente",
                    });
                  });
                }

                // Obtener la cantidad actual en inventario
                db.query(
                  "SELECT cantidad_actual FROM inventario WHERE producto_id = ?",
                  [productoId],
                  (err, inventario) => {
                    if (err) return db.rollback(() => callback(err, null));
                    if (inventario.length === 0) {
                      return db.rollback(() =>
                        callback(
                          new Error(
                            "No se encontró inventario para este producto."
                          ),
                          null
                        )
                      );
                    }

                    const cantidadAnterior = inventario[0].cantidad_actual;
                    const diferenciaCantidad = nuevaCantidad - cantidadAnterior;

                    // Actualizar la cantidad en el inventario
                    db.query(
                      "UPDATE inventario SET cantidad_actual = ?, fecha_ultima_actualizacion = NOW() WHERE producto_id = ?",
                      [nuevaCantidad, productoId],
                      (err) => {
                        if (err) return db.rollback(() => callback(err, null));

                        // Registrar el cambio en historial_inventario
                        db.query(
                          "INSERT INTO historial_inventario (producto_id, cantidad_cambiada, motivo, fecha_cambio) VALUES (?, ?, ?, NOW())",
                          [
                            productoId,
                            diferenciaCantidad,
                            "Actualización de stock",
                          ],
                          (err) => {
                            if (err)
                              return db.rollback(() => callback(err, null));

                            // Confirmar la transacción
                            db.commit((err) => {
                              if (err)
                                return db.rollback(() => callback(err, null));
                              callback(null, {
                                message:
                                  "Producto y stock actualizado correctamente",
                              });
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        }
      );
    });
  },

  /**
   * Elimina un producto, su inventario y su historial de inventario de la base de datos.
   * @param {number} productoId - ID del producto a eliminar.
   * @param {function} callback - Función callback para manejar el resultado.
   */
  deleteProduct: (productoId, callback) => {
    db.beginTransaction((err) => {
      if (err) return callback(err, null);

      // 1. Borrar el historial de inventario asociado al producto
      db.query(
        "DELETE FROM historial_inventario WHERE producto_id = ?",
        [productoId],
        (err, resultHistorial) => {
          if (err) return db.rollback(() => callback(err, null));

          // 2. Borrar el inventario asociado al producto
          db.query(
            "DELETE FROM inventario WHERE producto_id = ?",
            [productoId],
            (err, resultInventario) => {
              if (err) return db.rollback(() => callback(err, null));

              // 3. Borrar el producto de la tabla 'productos'
              db.query(
                "DELETE FROM productos WHERE id = ?",
                [productoId],
                (err, resultProducto) => {
                  if (err) return db.rollback(() => callback(err, null));

                  // Confirmar la transacción
                  db.commit((err) => {
                    if (err) return db.rollback(() => callback(err, null));
                    callback(null, {
                      message:
                        "Producto eliminado junto con su inventario e historial",
                    });
                  });
                }
              );
            }
          );
        }
      );
    });
  },
};

export default productos;
