import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

// api/services/rolesService.js
export const rolesService = {
    getRoles: async () => {
        return await api.get(API_ENDPOINTS.ROLES.BASE);
    },

    getRoleById: async (id) => {
        return await api.get(API_ENDPOINTS.ROLES.BY_ID(id));
    },

    createRole: async (roleData) => {
        return await api.post(API_ENDPOINTS.ROLES.BASE, roleData);
    },

    updateRole: async (id, roleData) => {
        return await api.put(API_ENDPOINTS.ROLES.BY_ID(id), roleData);
    },

    deleteRole: async (id) => {
        return await api.delete(API_ENDPOINTS.ROLES.BY_ID(id));
    }
};