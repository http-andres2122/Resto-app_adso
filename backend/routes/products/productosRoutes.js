import express from "express";
const router = express.Router();
import productoController from "../../controllers/products/productosController.js";
import auth from "../../middlewares/auth.js";
const app = express();

// Rutas para productos
// router.get("/", productoController.getAllProductos);
router.get("/:id", productoController.getWithCategoryProductId);
router.get("/categoria/:id", productoController.getWithCategoryProductId);
router.post("/", productoController.createProducto);
router.put("/:id", productoController.updateProducto);
router.delete("/:id", productoController.deleteProducto);

export default router;
