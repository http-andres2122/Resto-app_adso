const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const errorHandler = require("./middlewares/errorHandler");
const CustomError = require("./utils/customError");
const auth = require("./middlewares/auth");
const role = require("./middlewares/role");

// Middleware
app.use(express.json());
app.use(cors());

// Middleware de ejemplo para lanzar un error
app.get("/test-error", (req, res, next) => {
  next(new CustomError("Este es un error de prueba", 400));
});

// Rutas
const userRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productosRoutes");
const categoriaRoutes = require("./routes/categoriasRoutes");
const mesasRoutes = require("./routes/mesasRoutes");
const pedidos = require("./routes/pedidoRoutes");
const facturacion = require("./routes/facturacionRoutes");
const menu = require("./routes/menuRoutes");
const empleados = require("./routes/empleadosRoutes");
const inventario = require("./routes/inventarioRoutes");
const historialInventario = require("./routes/historialIventarioRoutes");
const reservas = require("./routes/reservasRoutes");
const pagos = require("./routes/pagosRoutes");
const login = require("./auth/authRoutes");

// Otras rutas para usuarios, pedidos, etc. pueden añadirse de manera similar
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", auth, role(1), userRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/mesas", mesasRoutes);
app.use("/api/pedidos", pedidos);
app.use("/api/factura", auth, role(1), facturacion);
app.use("/api/menu", menu);
app.use("/api/empleados", auth, role(1), empleados);
app.use("/api/inventario", inventario);
app.use("/api/historial-inventario", historialInventario);
app.use("/api/reservas", reservas);
app.use("/api/pagos", auth, role(1), pagos);
app.use("/api/auth", login);

// Manejador global de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
