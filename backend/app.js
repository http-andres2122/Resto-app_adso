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

//milddlewares
import auth from "./middlewares/auth.js";
import role from "./middlewares/role.js";

// Configuración
dotenv.config();
const app = express();

// Opciones de CORS
const corsOptions = {
  origin: "http://172.20.80.50:9005", // Solo permite peticiones desde frontend
  methods: "GET, POST, PUT, DELETE", // Solo permite el método POST
  allowedHeaders: "Content-Type, Authorization", // Solo permite el encabezado Content-Type
  credentials: true, // para enviar cookies o autenticación con credenciales
};

app.use(cors(corsOptions)); // Usa CORS con las opciones configuradas
app.use(express.json()); // Middleware para parsear el body de las peticiones JSON

// Rutas públicas
app.get("/api/productos", productosController.getAllWithCategory);
app.get("/api/menu", menuController.obtenerMenu);
app.get("/api/reservas", reservasController.getAllReservas);

// Rutas protegidas
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
  res.status(404).json({ message: "Recurso no encontrado" });
});

// Manejador de errores
app.use(errorHandler);

export default app;
