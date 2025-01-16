// categoriaController.js
import categoriaModel from "../../models/products/categoriasModel.js";

const categoriaController = {
  // Obtener todas las categorías
  obtenerCategorias: (req, res) => {
    categoriaModel.obtenerCategorias((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener las categorías" });
      }
      res.status(200).json(result);
    });
  },

  // Obtener una categoría por ID
  obtenerCategoriaPorId: (req, res) => {
    const id = req.params.id;
    categoriaModel.obtenerCategoriaPorId(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener la categoría" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.status(200).json(result[0]);
    });
  },

  // Crear una nueva categoría
  crearCategoria: (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
      return res
        .status(400)
        .json({ message: "El nombre de la categoría es obligatorio" });
    }
    categoriaModel.crearCategoria(nombre, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al crear la categoría" });
      }
      res.status(201).json({
        message: "Categoría creada exitosamente",
        id: result.insertId,
      });
    });
  },

  // Actualizar una categoría existente
  actualizarCategoria: (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    if (!nombre) {
      return res
        .status(400)
        .json({ message: "El nombre de la categoría es obligatorio" });
    }
    categoriaModel.actualizarCategoria(id, nombre, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar la categoría" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.status(200).json({ message: "Categoría actualizada exitosamente" });
    });
  },

  // Eliminar una categoría
  eliminarCategoria: (req, res) => {
    const id = req.params.id;
    categoriaModel.eliminarCategoria(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al eliminar la categoría" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.status(200).json({ message: "Categoría eliminada exitosamente" });
    });
  },
};

export default categoriaController;
