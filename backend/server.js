import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import errorHandler from "./middlewares/errorHandler.js";
import CustomError from "./utils/customError.js";
import auth from "./middlewares/auth.js";
import role from "./middlewares/role.js";

// Controladores
import menuController from "./controllers/menuController.js";
import productosController from "./controllers/productosController.js";
import reservasController from "./controllers/reservasController.js";
import pagosController from "./controllers/pagosController.js";

// Middleware
app.use(express.json());
app.use(cors());

// Middleware de ejemplo para lanzar un error
app.get("/test-error", (req, res, next) => {
  next(new CustomError("Este es un error de prueba", 400));
});

// Rutas
import userRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productosRoutes.js";
import categoriaRoutes from "./routes/categoriasRoutes.js";
import mesasRoutes from "./routes/mesasRoutes.js";
import pedidosRoutes from "./routes/pedidoRoutes.js";
import facturacionRoutes from "./routes/facturacionRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import empleadosRoutes from "./routes/empleadosRoutes.js";
import inventarioRoutes from "./routes/inventarioRoutes.js";
import historialInventarioRoutes from "./routes/historialIventarioRoutes.js";
import reservasRoutes from "./routes/reservasRoutes.js";
import pagosRoutes from "./routes/pagosRoutes.js";
import loginRoutes from "./auth/authRoutes.js";

// rutas publicas
app.get("/api/productos", productosController.getAllProductos); //public GET
app.get("/api/menu", menuController.obtenerMenu); // public GET
app.get("/api/reservas", reservasController.getAllReservas); // public GET
// app.post("/api/reservas", createReserva); // public POST
app.post("/api/pagos", auth, pagosController.createPago); // public POST

//rutas api
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
app.use("/api/auth", loginRoutes); //public login and register POST only
app.use("/api", (req, res) => {
  res.status(401).json({
    message: "Bienvenido a la API de restaurante :)",
  });
});
app.use("/", (req, res) => {
  res.status(401).json({
    message: "Bienvenido a la API de restaurante :)",
  });
});

// Manejador global de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
