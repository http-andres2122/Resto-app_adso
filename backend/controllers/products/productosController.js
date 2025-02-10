import Producto from "../../models/products/productosModel.js";

const productosController = {
  //get products all with category
  getAllWithCategory: (req, res) => {
    Producto.getWithCategory((err, producto) => {
      if (err) return res.status(500).json({ error: err });
      return res.json(producto);
    });
  },

  //get products with category by product ID
  getWithCategoryProductId: (req, res) => {
    const { id } = req.params;
    Producto.getWithCategoryProductId(id, (err, producto) => {
      if (err) return res.status(500).json({ error: err });
      if (!producto)
        return res.status(404).json({ message: "Producto no encontrado" });
      return res.json(producto);
    });
  },

  //get products with category by category ID
  getWithCategoryByCategoryId: (req, res) => {
    const { id } = req.params;
    Producto.getWithCategoryCategoryId(id, (err, producto) => {
      if (err) return res.status(500).json({ error: err });
      if (!producto)
        return res.status(404).json({ message: "Producto no encontrado" });
      return res.json(producto);
    });
  },

  /*
  New methods
  */

  /**
   * Obtiene todos los productos con su stock y la información de la categoría.
   * Ruta: GET /productos
   *
   * @param {Object} req - Objeto de solicitud de Express.
   * @param {Object} res - Objeto de respuesta de Express.
   *
   * @returns {JSON} Lista de productos con su información.
   *
   * @example
   * // Respuesta esperada:
   * {
   *   "success": true,
   *   "productos": [
   *     {
   *       "id": 1,
   *       "nombre": "Pizza Margarita",
   *       "descripcion": "Pizza con tomate, mozzarella y albahaca",
   *       "precio": 12.99,
   *       "categoria_id": 2,
   *       "categoria_nombre": "Pizzas",
   *       "stock": 20
   *     },
   *     {
   *       "id": 2,
   *       "nombre": "Hamburguesa Doble",
   *       "descripcion": "Hamburguesa con doble carne y queso",
   *       "precio": 10.50,
   *       "categoria_id": 3,
   *       "categoria_nombre": "Hamburguesas",
   *       "stock": 15
   *     }
   *   ]
   * }
   */
  getAllProductos: (req, res) => {
    Producto.getAllWithStock((err, productos) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al obtener productos",
          error: err.message,
        });
      }
      res.json(productos);
    });
  },

  /**
   * Agrega un nuevo producto y su inventario inicial.
   * Ruta: POST /productos/addProduct
   * Se espera recibir en el body:
   * {
   *   "nombre": "Nombre del producto",
   *   "descripcion": "Descripción del producto",
   *   "precio": 10.50,
   *   "categoriaId": 3,
   *   "cantidadInicial": 50
   * }
   * Respuesta esperada:
   * {
   *   "success": true,
   *   "message": "Producto agregado correctamente",
   *   "productoId": 1
   * }
   */
  addProduct: (req, res) => {
    const { nombre, descripcion, precio, categoriaId, cantidadInicial } =
      req.body;

    // Validar que se reciban los campos mínimos
    if (!nombre || !precio || !categoriaId || cantidadInicial === undefined) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    Producto.addProduct(
      nombre,
      descripcion,
      precio,
      categoriaId,
      cantidadInicial,
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        return res.status(201).json(result);
      }
    );
  },

  /**
   * Actualiza un producto y su inventario.
   * Ruta: PUT /productos/:id
   * Se espera recibir en el body (todos los campos son opcionales):
   * {
   *   "nombre": "Nuevo nombre del producto",
   *   "descripcion": "Nueva descripción",
   *   "precio": 15.75,
   *   "categoriaId": 4,
   *   "nuevaCantidad": 100
   * }
   * Respuesta esperada:
   * {
   *   "success": true,
   *   "message": "Producto y stock actualizado correctamente"
   * }
   */
  updateProducto: (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoriaId, nuevaCantidad } =
      req.body;

    if (
      !nombre &&
      !descripcion &&
      !precio &&
      !categoriaId &&
      nuevaCantidad === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Debe enviar al menos un campo para actualizar",
      });
    }

    Producto.updateProduct(
      id,
      nombre,
      descripcion,
      precio,
      categoriaId,
      nuevaCantidad,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error al actualizar producto",
            error: err.message,
          });
        }
        res.json({
          success: true,
          message: "Producto y stock actualizado correctamente",
        });
      }
    );
  },

  /**
   * Elimina un producto, su inventario y su historial de inventario.
   * Ruta: DELETE /productos/:id
   * Parámetro de URL:
   * - id (número): ID del producto a eliminar.
   * Respuesta esperada:
   * {
   *   "success": true,
   *   "message": "Producto eliminado correctamente"
   * }
   */
  deleteProduct: (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere el ID del producto" });
    }

    Producto.deleteProduct(id, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res.status(200).json({ success: true, message: result.message });
    });
  },
};

export default productosController;
