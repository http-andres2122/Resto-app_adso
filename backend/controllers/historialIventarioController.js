const historialInventarioModel = require("../models/historialInventarioModel");

const historialInventarioController = {
  async getAll(req, res) {
    try {
      const data = await historialInventarioModel.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await historialInventarioModel.getById(id);
      if (!data)
        return res.status(404).json({ error: "Historial no encontrado" });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newHistorial = req.body;
      const createdHistorial = await historialInventarioModel.create(
        newHistorial
      );
      res.status(201).json(createdHistorial);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedHistorial = await historialInventarioModel.update(
        id,
        req.body
      );
      res.json(updatedHistorial);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await historialInventarioModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = historialInventarioController;
