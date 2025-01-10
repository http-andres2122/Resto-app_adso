// api/services/empleadosService.js
import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

export const empleadosService = {
    getEmpleados: async () => {
        return await api.get(API_ENDPOINTS.EMPLEADOS.BASE);
    },

    getEmpleadoById: async (id) => {
        return await api.get(API_ENDPOINTS.EMPLEADOS.BY_ID(id));
    },

    getEmpleadosByRole: async (roleId) => {
        return await api.get(API_ENDPOINTS.EMPLEADOS.BY_ROLE(roleId));
    },

    createEmpleado: async (empleadoData) => {
        return await api.post(API_ENDPOINTS.EMPLEADOS.BASE, empleadoData);
    },

    updateEmpleado: async (id, empleadoData) => {
        return await api.put(API_ENDPOINTS.EMPLEADOS.BY_ID(id), empleadoData);
    },

    deleteEmpleado: async (id) => {
        return await api.delete(API_ENDPOINTS.EMPLEADOS.BY_ID(id));
    }
};