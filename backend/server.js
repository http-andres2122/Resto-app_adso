const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

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
app.use("/api/usuarios", userRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/mesas", mesasRoutes);
app.use("/api/pedidos", pedidos);
app.use("/api/factura", facturacion);
app.use("/api/menu", menu);
app.use("/api/empleados", empleados);
app.use("/api/inventario", inventario);
app.use("/api/historial-inventario", historialInventario);
app.use("/api/reservas", reservas);
app.use("/api/pagos", pagos);
app.use("/api/auth", login);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
