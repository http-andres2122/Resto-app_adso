import Producto from "../../models/products/productosModel.js";

const productosController = {
  // Obtener todos los productos
  getAllProductos: (req, res) => {
    Producto.getAll((err, productos) => {
      if (err) return res.status(500).json({ error: err });
      return res.json(productos);
    });
  },

  // Obtener un producto por ID
  getProductoById: (req, res) => {
    const { id } = req.params;
    Producto.getById(id, (err, producto) => {
      if (err) return res.status(500).json({ error: err });
      if (!producto)
        return res.status(404).json({ message: "Producto no encontrado" });
      return res.json(producto);
    });
  },

  // Crear un nuevo producto
  createProducto: (req, res) => {
    const newProducto = req.body;
    Producto.create(newProducto, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      return res
        .status(201)
        .json({ message: "Producto creado", id: result.insertId });
    });
  },

  // Actualizar un producto existente
  updateProducto: (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    Producto.update(id, updatedData, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Producto actualizado" });
    });
  },

  // Eliminar un producto
  deleteProducto: (req, res) => {
    const { id } = req.params;
    Producto.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Producto eliminado" });
    });
  },

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
};

export default productosController;
