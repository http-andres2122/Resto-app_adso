// components/Sidebar/MenuItems.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions'; // Importa el hook para permisos
import { PERMISSIONS } from '../../constants/permissions'; // Importa las constantes de permisos

const MenuItems = ({ activeSection, setMenuOpen }) => { // Ya no necesitamos setActiveSection
    const { hasPermission } = usePermissions(); // Obtiene la función hasPermission
    const location = useLocation();

    // Datos de los items del menú, incluyendo el permiso requerido para cada uno
    const menuItemsData = [
        { id: "overview", label: "Resumen", permission: null, path: "/dashboard/overview" },
        { id: "products", label: "Productos", permission: PERMISSIONS.PRODUCTOS.VER, path: "/dashboard/products" },
        { id: "orders", label: "Pedidos", permission: PERMISSIONS.ORDENES.VER, path: "/dashboard/orders" },
        { id: "tables", label: "Mesas", permission: PERMISSIONS.MESAS.VER, path: "/dashboard/tables" },
        { id: "settings", label: "Ajustes", permission: PERMISSIONS.CONFIGURACION.VER, path: "/dashboard/settings" },
    ];

    // Función para manejar la navegación
    const handleNavigation = (path) => {
        if (setMenuOpen) setMenuOpen(false); // Cierra el menú móvil si existe
        // No necesitamos usar History ya que el Link se encargará de la navegación
    };

    return (
        <>
            {/* Itera sobre los datos de los items del menú */}
            {menuItemsData.map((item) => {
                // Verifica si el item no requiere permiso (permission es null)
                // O si el usuario tiene el permiso requerido
                if (!item.permission || hasPermission(item.permission)) {
                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            className="w-full block"
                            onClick={() => {
                                if (setMenuOpen) setMenuOpen(false); // Cierra el menú móvil, solo en móvil
                            }}
                        >
                            <li
                                className={`p-4 cursor-pointer hover:bg-blue-700 dark:hover:bg-gray-700 ${activeSection === item.id ? "bg-blue-800" : "" // Estilo para el item activo
                                    }`}
                            >
                                {item.label} {/* Muestra la etiqueta del item */}
                            </li>
                        </Link>
                    );
                }
                return null; // No renderiza el item si no tiene permiso
            })}
        </>
    );
};

export default MenuItems;