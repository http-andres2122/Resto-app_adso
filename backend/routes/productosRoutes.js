const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productosController");
const auth = require("../middlewares/auth");
const app = express();

// Rutas para productos
// router.get("/", productoController.getAllProductos);
router.get("/:id", productoController.getProductoById);
router.post("/", productoController.createProducto);
router.put("/:id", productoController.updateProducto);
router.delete("/:id", productoController.deleteProducto);

module.exports = router;
