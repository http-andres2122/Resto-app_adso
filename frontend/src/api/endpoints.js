// src/api/endpoints.js

export const API_ENDPOINTS = {
  // Autenticación
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  profile: "/auth/profile",

  // Usuarios
  getUsuarios: "/usuarios",
  getUsuarioById: (id) => `/usuarios/${id}`,
  createUsuario: "/usuarios",
  updateUsuario: (id) => `/usuarios/${id}`,
  deleteUsuario: (id) => `/usuarios/${id}`,

  // Empleados
  getEmpleados: "/empleados",
  getEmpleadoById: (id) => `/empleados/${id}`,
  createEmpleado: "/empleados",
  updateEmpleado: (id) => `/empleados/${id}`,
  deleteEmpleado: (id) => `/empleados/${id}`,

  // Productos
  getProductos: "/productos",
  getProductoById: (id) => `/productos/${id}`,
  createProducto: "/productos",
  updateProducto: (id) => `/productos/${id}`,
  deleteProducto: (id) => `/productos/${id}`,

  // Pedidos
  getPedidos: "/pedidos",
  getPedidoById: (id) => `/pedidos/${id}`,
  createPedido: "/pedidos",
  updatePedido: (id) => `/pedidos/${id}`,
  deletePedido: (id) => `/pedidos/${id}`,

  // Mesas
  getMesas: "/mesas",
  getMesaById: (id) => `/mesas/${id}`,
  createMesa: "/mesas",
  updateMesa: (id) => `/mesas/${id}`,
  deleteMesa: (id) => `/mesas/${id}`,

  // Reservas
  getReservas: "/reservas",
  getReservaById: (id) => `/reservas/${id}`,
  createReserva: "/reservas",
  updateReserva: (id) => `/reservas/${id}`,
  deleteReserva: (id) => `/reservas/${id}`,

  // Facturación
  getFacturacion: "/facturacion",
  getFacturaById: (id) => `/facturacion/${id}`,
  createFactura: "/facturacion",
  updateFactura: (id) => `/facturacion/${id}`,
  deleteFactura: (id) => `/facturacion/${id}`,

  // Pagos
  getPagos: "/pagos",
  getPagoById: (id) => `/pagos/${id}`,
  createPago: "/pagos",
  updatePago: (id) => `/pagos/${id}`,
  deletePago: (id) => `/pagos/${id}`,

  // Categorias
  getCategorias: "/categorias",
  getCategoriaById: (id) => `/categorias/${id}`,
  createCategoria: "/categorias",
  updateCategoria: (id) => `/categorias/${id}`,
  deleteCategoria: (id) => `/categorias/${id}`,

  // Historial Inventario
  getHistorialInventario: "/historial_inventario",
  getHistorialInventarioById: (id) => `/historial_inventario/${id}`,
  createHistorialInventario: "/historial_inventario",
  updateHistorialInventario: (id) => `/historial_inventario/${id}`,
  deleteHistorialInventario: (id) => `/historial_inventario/${id}`,

  // Inventario
  getInventario: "/inventario",
  getInventarioById: (id) => `/inventario/${id}`,
  createInventario: "/inventario",
  updateInventario: (id) => `/inventario/${id}`,
  deleteInventario: (id) => `/inventario/${id}`,

  // Menu
  getMenu: "/menu",
  getMenuById: (id) => `/menu/${id}`,
  updateMenu: (id) => `/menu/${id}`,
  createMenu: "/menu",
  deleteMenu: (id) => `/menu/${id}`,

  // Roles
  getRoles: "/roles",
  getRoleById: (id) => `/roles/${id}`,
  createRole: "/roles",
  updateRole: (id) => `/roles/${id}`,
  deleteRole: (id) => `/roles/${id}`,
};
