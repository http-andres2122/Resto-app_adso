// api/services/authService.js
import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

export const authService = {
    // Login del usuario
    login: async (credentials) => {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
            // Guardar token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Registro de usuario
    register: async (userData) => {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Logout
    logout: async () => {
        try {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT);
            localStorage.removeItem('token');
        } catch (error) {
            // Incluso si falla la petición, eliminamos el token local
            localStorage.removeItem('token');
            throw error;
        }
    },

    // Refrescar token
    refreshToken: async () => {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};