import React from "react";
import { useNavigate } from "react-router-dom";
import TableOrders from "../../../app/components/orders/TableOrders";

export default function Orders() {
    const navigate = useNavigate();

    // Navegar a la página de agregar pedido
    const handleAddOrderClick = () => {
        navigate("/dashboard/orders/add");
    };

    return (
        // Contenedor de la página
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {/* Página */}
            <div>
                {/* Título */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Gestión de Pedidos</h2>
                </div>

                {/* Botón para agregar pedido */}
                <div className="mb-4">
                    <button
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                        onClick={handleAddOrderClick}
                    >
                        + Agregar Pedido
                    </button>
                </div>

                {/* Tabla de pedidos */}
                <div className="overflow-x-auto">
                    <TableOrders />
                </div>
            </div>
        </div>
    );
}
