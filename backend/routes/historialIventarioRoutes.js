// routes/historialInventarioRoutes.js
const express = require("express");
const historialInventarioController = require("../controllers/historialIventarioController");

const router = express.Router();

router.get("/", historialInventarioController.getAll);
router.get("/:id", historialInventarioController.getById);
router.post("/", historialInventarioController.create);
router.put("/:id", historialInventarioController.update);
router.delete("/:id", historialInventarioController.delete);

module.exports = router;
