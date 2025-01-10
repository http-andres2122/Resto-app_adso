// routes/historialInventarioRoutes.js
import express from "express";
import historialInventarioController from "../controllers/historialIventarioController.js";
const router = express.Router();

router.get("/", historialInventarioController.getAll);
router.get("/:id", historialInventarioController.getById);
router.post("/", historialInventarioController.create);
router.put("/:id", historialInventarioController.update);
router.delete("/:id", historialInventarioController.delete);

export default router;
