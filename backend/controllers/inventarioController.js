//se importa el modelo de inventario
const inventario = require("../models/inventarioModel");

const inventarioController = {
  //Obtener todos los productos
  getAllProductos: async (req, res) => {
    try {
      const producto = await inventario.getAllProductos();
      res.json(producto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  },

  //obtener un producto por ID
  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await inventario.getProductById(id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(producto);
      //depuracion de errores
      console.log(producto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener producto" });
    }
  },

  //crear un nuevo producto
  createProduct: async (req, res) => {
    const { producto_id, cantidad_actual } = req.body;
    try {
      const newProductId = await inventario.createProduct({
        producto_id,
        cantidad_actual,
      });
      res.status(201).json({ id: newProductId, producto_id });
      //depuracion de errores
      console.log("Producto creado con exito!", newProductId);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creando producto" });
    }
  },

  //actualizar cantidad de un producto
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { cantidad_actual } = req.body;
    try {
      const affectedRows = await inventario.updateProduct(id, {
        cantidad_actual,
      });
      res.json(affectedRows);
      //depuracion de errores
      console.log("Producto actualizado con exito!", affectedRows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error actualizando producto" });
    }
  },

  //eliminar un producto
  deletedPrduct: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await inventario.deleteProduct(id);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json({ success: "Producto eliminado con exito!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error eliminando producto" });
    }
  },
};

module.exports = inventarioController;
