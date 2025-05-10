import express from "express";
const router = express.Router();
import productoController from "../../controllers/products/productosController.js";
const app = express();

// Rutas para productos
router.get("/:id", productoController.getWithCategoryProductId);
router.get("/category/:id", productoController.getWithCategoryProductId);
//addProduct
router.post("/addProduct", productoController.addProduct);
//deleteProduct
router.delete("/deleteProduct/:id", productoController.deleteProduct);
//updateProducto
router.put("/updateProduct/:id", productoController.updateProducto);

export default router;
