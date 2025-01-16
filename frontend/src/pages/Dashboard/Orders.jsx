import React from "react";

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
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {/* Título */}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Gestión de Pedidos</h2>

            {/* Tabla de Pedidos */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg shadow-md">
                    <thead className="bg-gray-200 dark:bg-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">ID Pedido</th>
                            <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Cliente</th>
                            <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Ítems</th>
                            <th className="px-6 py-3 text-right text-gray-700 dark:text-gray-300 font-semibold">Total</th>
                            <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">Estado</th>
                            <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">Fecha</th>
                            <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t dark:border-gray-600">
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{order.id}</td>
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{order.customer}</td>
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{order.items}</td>
                                <td className="px-6 py-4 text-right text-gray-800 dark:text-gray-200">${order.total.toFixed(2)}</td>
                                <td className={`px-6 py-4 text-center ${getStatusClass(order.status)} dark:text-gray-200`}>
                                    {order.status}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-800 dark:text-gray-200">{order.date}</td>
                                <td className="px-6 py-4 text-center">
                                    {order.status !== "Entregado" && (
                                        <button className="px-4 py-2 text-sm bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500">
                                            Actualizar
                                        </button>
                                    )}
                                    <button className="ml-2 px-4 py-2 text-sm bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-500">
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
