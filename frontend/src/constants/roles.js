// src/constants/permissions.js
export const ROLES = {
    ADMIN: 1,
    MESERO: 5,
    COCINA: 3,
    CAJA: 4,
    CLIENTE: 2,
    EMPLEADO: 6
};

export const PERMISSIONS = {
    VIEW_PRODUCTS: 'view_products',
    MANAGE_PRODUCTS: 'manage_products',
    VIEW_ORDERS: 'view_orders',
    MANAGE_ORDERS: 'manage_orders',
    VIEW_TABLES: 'view_tables',
    MANAGE_TABLES: 'manage_tables',
    VIEW_SETTINGS: 'view_settings',
    MANAGE_SETTINGS: 'manage_settings',
    // ... otros permisos
};

export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
        PERMISSIONS.MANAGE_PRODUCTS,
        PERMISSIONS.VIEW_PRODUCTS,
        PERMISSIONS.MANAGE_ORDERS,
        PERMISSIONS.VIEW_ORDERS,
        PERMISSIONS.MANAGE_TABLES,
        PERMISSIONS.VIEW_TABLES,
        PERMISSIONS.MANAGE_SETTINGS,
        PERMISSIONS.VIEW_SETTINGS,
        // ... todos los permisos
    ],
    [ROLES.COCINA]: [
        PERMISSIONS.MANAGE_PRODUCTS,
        PERMISSIONS.VIEW_PRODUCTS,
    ],
    [ROLES.MESERO]: [
        PERMISSIONS.VIEW_ORDERS,
        PERMISSIONS.VIEW_TABLES,
    ],
    [ROLES.CAJA]: [
        PERMISSIONS.MANAGE_ORDERS,
        PERMISSIONS.VIEW_ORDERS,
    ],
    [ROLES.CLIENTE]:[],
    [ROLES.EMPLEADO]:[]
    // ... otros roles y sus permisos
};