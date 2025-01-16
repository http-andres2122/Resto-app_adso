// hooks/usePermissions.jsx 
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ROLES_PERMISSIONS, ROLES } from '../constants/permissions';

export const usePermissions = () => {
    const { user } = useContext(AuthContext);
    let userId, userRole;
    //user 
    if (user) {
        userId = user.id;
        userRole = user.role; // Accede al rol si está presente

        // Usa userId y userRole para autorización u otros propósitos
        console.log("Hook Permissions: ID del usuario:", userId);
        console.log("Hook Permissions: Rol del usuario:", userRole);
    } else {
        // Maneja el caso en el que el usuario no ha iniciado sesión
        console.log("Hook Permissions: Usuario no autenticado");
    }
    //verify role and permissions
    const hasPermission = (permission) => {
        if (userRole === null || ROLES_PERMISSIONS[userRole] === undefined) { //Verifica que el rol exista en ROLES_PERMISSIONS y que no sea nulo
            return false;
        }
        return ROLES_PERMISSIONS[userRole].includes(permission);
    };

    const isAllowedForAdmin = () => hasPermission(ROLES_PERMISSIONS[ROLES.ADMIN]);
    const isAllowedForWaiter = () => hasPermission(ROLES_PERMISSIONS[ROLES.MESERO]);
    const isAllowedForKitchen = () => hasPermission(ROLES_PERMISSIONS[ROLES.COCINA]);
    const isAllowedForCashier = () => hasPermission(ROLES_PERMISSIONS[ROLES.CAJA]);
    const isAllowedForClient = () => hasPermission(ROLES_PERMISSIONS[ROLES.CLIENTE]);
    const isAllowedForEmployee = () => hasPermission(ROLES_PERMISSIONS[ROLES.EMPLEADO]);

    return { hasPermission, isAllowedForAdmin, isAllowedForWaiter, isAllowedForKitchen, isAllowedForCashier, isAllowedForClient, isAllowedForEmployee };
};