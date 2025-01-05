const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const errorHandler = require("./middlewares/errorHandler");
const CustomError = require("./utils/customError");
const auth = require("./middlewares/auth");
const role = require("./middlewares/role");

// Controladores
const { obtenerMenu } = require("./controllers/menuController");
const { getAllProductos } = require("./controllers/productosController");
const {
  getAllReservas,
  createReserva,
} = require("./controllers/reservasController");
const { createPago } = require("./controllers/pagosController");

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

// rutas publicas
app.get("/api/productos", getAllProductos); //public GET
app.get("/api/menu", obtenerMenu); // public GET
app.get("/api/reservas", getAllReservas); // public GET
// app.post("/api/reservas", createReserva); // public POST
app.post("/api/pagos", auth, createPago); // public POST

//rutas api
app.use("/api/productos", auth, role(1), productoRoutes);
app.use("/api/usuarios", auth, role(1), userRoutes);
app.use("/api/categorias", auth, role(1), categoriaRoutes);
app.use("/api/mesas", auth, role(1, 2), mesasRoutes);
app.use("/api/pedidos", auth, role(1, 2), pedidos);
app.use("/api/factura", auth, role(1, 2), facturacion);
app.use("/api/menu", auth, role(1), menu);
app.use("/api/empleados", auth, role(1), empleados);
app.use("/api/inventario", auth, role(1), inventario);
app.use("/api/historial-inventario", auth, role(1), historialInventario);
app.use("/api/reservas", auth, role(1), reservas);
app.use("/api/pagos", auth, role(1), pagos);
app.use("/api/auth", login); //public login and register POST only
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
