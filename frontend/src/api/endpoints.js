// api/endpoints.js
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh-token',
    },
    // User endpoints
    USER: {
        BASE: '/users',
        PROFILE: '/users/profile',
        BY_ID: (id) => `/users/${id}`,
        UPDATE_PROFILE: '/users/profile/update',
    },
    // Otros recursos
    PRODUCTS: {
        BASE: '/products',
        BY_ID: (id) => `/products/${id}`,
        CATEGORIES: '/products/categories',
    },
};