import React from "react";
import TableOrders from "../../../app/components/orders/TableOrders";
export default function Orders() {
    const orders = [
        { id: 101, customer: "Juan Pérez", items: 3, total: 25.5, status: "Pendiente", date: "2024-12-03" },
        { id: 102, customer: "Ana Gómez", items: 5, total: 40.0, status: "Preparando", date: "2024-12-03" },
        { id: 103, customer: "Carlos Sánchez", items: 2, total: 15.0, status: "Entregado", date: "2024-12-02" },
        { id: 104, customer: "Laura Martínez", items: 4, total: 35.0, status: "Pendiente", date: "2024-12-01" },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case "Pendiente":
                return "text-yellow-500 font-semibold";
            case "Preparando":
                return "text-blue-500 font-semibold";
            case "Entregado":
                return "text-green-500 font-semibold";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {/* Título */}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Gestión de Pedidos</h2>

            {/* Tabla de Pedidos */}
            <div className="overflow-x-auto">
                <TableOrders />
            </div>
        </div>
    );
}
