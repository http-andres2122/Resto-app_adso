// api/endpoints.js
export const API_ENDPOINTS = {
    // Autenticación y Usuarios
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh',
        PROFILE: '/auth/profile',
    },

    USERS: {
        BASE: '/usuarios',
        BY_ID: (id) => `/usuarios/${id}`,
        UPDATE_PROFILE: (id) => `/usuarios/${id}`,
        CHANGE_PASSWORD: (id) => `/usuarios/${id}/password`,
    },

    // Empleados
    EMPLEADOS: {
        BASE: '/empleados',
        BY_ID: (id) => `/empleados/${id}`,
        BY_ROLE: (roleId) => `/empleados/role/${roleId}`,
    },

    // Roles
    ROLES: {
        BASE: '/roles',
        BY_ID: (id) => `/roles/${id}`,
    },

    // Productos y Categorías
    PRODUCTOS: {
        BASE: '/productos',
        BY_ID: (id) => `/productos/${id}`,
        BY_CATEGORIA: (categoriaId) => `/productos/categoria/${categoriaId}`,
    },

    CATEGORIAS: {
        BASE: '/categorias',
        BY_ID: (id) => `/categorias/${id}`,
    },

    // Inventario
    INVENTARIO: {
        BASE: '/inventario',
        BY_PRODUCTO: (productoId) => `/inventario/producto/${productoId}`,
        HISTORIAL: '/inventario/historial',
        HISTORIAL_BY_PRODUCTO: (productoId) => `/inventario/historial/producto/${productoId}`,
    },

    // Menú
    MENU: {
        BASE: '/menu',
        DISPONIBLES: '/menu/disponibles',
        TOGGLE_DISPONIBILIDAD: (productoId) => `/menu/producto/${productoId}/disponibilidad`,
    },

    // Mesas y Reservas
    MESAS: {
        BASE: '/mesas',
        BY_ID: (id) => `/mesas/${id}`,
        DISPONIBLES: '/mesas/disponibles',
    },

    RESERVAS: {
        BASE: '/reservas',
        BY_ID: (id) => `/reservas/${id}`,
        BY_MESA: (mesaId) => `/reservas/mesa/${mesaId}`,
        BY_USUARIO: (userId) => `/reservas/usuario/${userId}`,
        BY_FECHA: '/reservas/fecha',
    },

    // Pedidos
    PEDIDOS: {
        BASE: '/pedidos',
        BY_ID: (id) => `/pedidos/${id}`,
        BY_MESA: (mesaId) => `/pedidos/mesa/${mesaId}`,
        BY_USUARIO: (userId) => `/pedidos/usuario/${userId}`,
        ACTUALIZAR_ESTADO: (id) => `/pedidos/${id}/estado`,
    },

    // Facturación y Pagos
    FACTURACION: {
        BASE: '/facturacion',
        BY_ID: (id) => `/facturacion/${id}`,
        BY_PEDIDO: (pedidoId) => `/facturacion/pedido/${pedidoId}`,
    },

    PAGOS: {
        BASE: '/pagos',
        BY_ID: (id) => `/pagos/${id}`,
        BY_FACTURA: (facturaId) => `/pagos/factura/${facturaId}`,
        PROCESAR_PAGO: (id) => `/pagos/${id}/procesar`,
        CANCELAR_PAGO: (id) => `/pagos/${id}/cancelar`,
    }
};