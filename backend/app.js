// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import CustomError from "./utils/customError.js";

// Rutas
import userRoutes from "./routes/users/usuarioRoutes.js";
import productoRoutes from "./routes/products/productosRoutes.js";
import categoriaRoutes from "./routes/products/categoriasRoutes.js";
import mesasRoutes from "./routes/orders/mesasRoutes.js";
import pedidosRoutes from "./routes/orders/pedidoRoutes.js";
import facturacionRoutes from "./routes/invoice/facturacionRoutes.js";
import menuRoutes from "./routes/products/menuRoutes.js";
import empleadosRoutes from "./routes/users/empleadosRoutes.js";
import inventarioRoutes from "./routes/products/inventarioRoutes.js";
import historialInventarioRoutes from "./routes/products/historialIventarioRoutes.js";
import reservasRoutes from "./routes/orders/reservasRoutes.js";
import pagosRoutes from "./routes/invoice/pagosRoutes.js";
import loginRoutes from "./auth/authRoutes.js";

// Controladores públicos
import menuController from "./controllers/products/menuController.js";
import productosController from "./controllers/products/productosController.js";
import reservasController from "./controllers/orders/reservasController.js";

// Configuración
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Middleware de ejemplo para lanzar un error
app.get("/test-error", (req, res, next) => {
  next(new CustomError("Este es un error de prueba", 400));
});

// Rutas públicas
app.get("/api/productos", productosController.getAllProductos);
app.get("/api/menu", menuController.obtenerMenu);
app.get("/api/reservas", reservasController.getAllReservas);

// Rutas protegidas
import auth from "./middlewares/auth.js";
import role from "./middlewares/role.js";
app.use("/api/productos", auth, role(1), productoRoutes);
app.use("/api/usuarios", auth, role(1), userRoutes);
app.use("/api/categorias", auth, role(1), categoriaRoutes);
app.use("/api/mesas", auth, role(1, 2), mesasRoutes);
app.use("/api/pedidos", auth, role(1, 2), pedidosRoutes);
app.use("/api/factura", auth, role(1, 2), facturacionRoutes);
app.use("/api/menu", auth, role(1), menuRoutes);
app.use("/api/empleados", auth, role(1), empleadosRoutes);
app.use("/api/inventario", auth, role(1), inventarioRoutes);
app.use("/api/historial-inventario", auth, role(1), historialInventarioRoutes);
app.use("/api/reservas", auth, role(1), reservasRoutes);
app.use("/api/pagos", auth, role(1), pagosRoutes);
app.use("/api/auth", loginRoutes);

// Ruta por defecto
app.use("/", (req, res) => {
  res.status(401).json({ message: "Bienvenido a la API de restaurante :)" });
});

// Manejador de errores
app.use(errorHandler);

export default app;
