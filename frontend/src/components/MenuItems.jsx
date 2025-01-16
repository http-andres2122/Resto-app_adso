// components/Sidebar/MenuItems.jsx
import React from 'react';
import { usePermissions } from '../hooks/usePermissions'; // Importa el hook para permisos
import { PERMISSIONS } from '../constants/permissions'; // Importa las constantes de permisos

const MenuItems = ({ activeSection, setActiveSection, setMenuOpen }) => { // Recibe las props
    const { hasPermission } = usePermissions(); // Obtiene la función hasPermission

    // Datos de los items del menú, incluyendo el permiso requerido para cada uno
    const menuItemsData = [
        { id: "overview", label: "Resumen", permission: null }, // No requiere permiso
        { id: "products", label: "Productos", permission: PERMISSIONS.PRODUCTOS.VER },
        { id: "orders", label: "Pedidos", permission: PERMISSIONS.ORDENES.VER },
        { id: "tables", label: "Mesas", permission: PERMISSIONS.MESAS.VER },
        { id: "settings", label: "Ajustes", permission: PERMISSIONS.CONFIGURACION.VER },
    ];

    return (
        <>
            {/* Itera sobre los datos de los items del menú */}
            {menuItemsData.map((item) => {
                // Verifica si el item no requiere permiso (permission es null)
                // O si el usuario tiene el permiso requerido
                if (!item.permission || hasPermission(item.permission)) {
                    return (
                        // Renderiza un elemento <li> para el item del menú
                        <li
                            key={item.id} // Clave única para cada elemento en la lista
                            className={`p-4 cursor-pointer hover:bg-blue-700 dark:hover:bg-gray-700 ${activeSection === item.id ? "bg-blue-800" : "" // Estilo para el item activo
                                }`}
                            onClick={() => {
                                setActiveSection(item.id); // Cambia la sección activa
                                if (setMenuOpen) setMenuOpen(false); // Cierra el menú móvil, solo se ejecuta en el menu movil
                            }}
                        >
                            {item.label} {/* Muestra la etiqueta del item */}
                        </li>
                    );
                }
                return null; // No renderiza el item si no tiene permiso
            })}
        </>
    );
};

export default MenuItems;