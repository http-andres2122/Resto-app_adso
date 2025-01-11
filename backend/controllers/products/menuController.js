// controllers/menuController.js
import menu from "../../models/products/menuModel.js"; // Importamos el modelo de menú

const menuController = {
  obtenerMenu: (req, res) => {
    menu.obtenerMenu((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener el menú" });
      }
      res.status(200).json(result);
    });
  },

  obtenerMenuPorId: (req, res) => {
    const id = req.params.id;
    menu.obtenerMenuPorId(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener el producto del menú" });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Producto no encontrado en el menú" });
      }
      res.status(200).json(result[0]);
    });
  },

  agregarProductoAlMenu: (req, res) => {
    const { producto_id, disponible } = req.body;

    if (!producto_id || disponible === undefined) {
      return res
        .status(400)
        .json({ message: "Producto ID y disponibilidad son requeridos" });
    }

    menu.agregarProductoAlMenu(producto_id, disponible, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al agregar el producto al menú" });
      }
      res.status(201).json({
        message: "Producto agregado al menú exitosamente",
        id: result.insertId,
      });
    });
  },

  actualizarProductoEnMenu: (req, res) => {
    const id = req.params.id;
    const { disponible } = req.body;

    if (disponible === undefined) {
      return res
        .status(400)
        .json({ message: "La disponibilidad del producto es requerida" });
    }

    menu.actualizarProductoEnMenu(id, disponible, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el producto en el menú" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Producto no encontrado en el menú" });
      }
      res
        .status(200)
        .json({ message: "Producto actualizado en el menú exitosamente" });
    });
  },

  eliminarProductoDelMenu: (req, res) => {
    const id = req.params.id;
    menu.eliminarProductoDelMenu(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al eliminar el producto del menú" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Producto no encontrado en el menú" });
      }
      res
        .status(200)
        .json({ message: "Producto eliminado del menú exitosamente" });
    });
  },
};

export default menuController;
