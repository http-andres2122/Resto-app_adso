import React, { useState } from "react";
import TableOrders from "../../../app/components/orders/TableOrders";
import useOrderStore from "../../../app/store/OrderStore.jsx";
import AddOrder from "../../../app/components/orders/AddOrder";
import OrderDetails from "../../../app/components/orders/OrderDetails";

export default function Orders() {
    const { addOrder, setAddOrder, editOrder } = useOrderStore();


    return (
        // Contenedor de la página
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {/* Página */}
            <div>

                {/* Título */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Gestión de Pedidos</h2>
                {/* Botón para agregar pedido */}
                <div className="mb-4">
                    {/* Muestra el botón solo si editOrder es falso */}
                    {!addOrder && !editOrder && (
                        <button
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                            onClick={() => setAddOrder(true)} // Muestra el formulario al hacer clic
                        >
                            + Agregar Pedido
                        </button>
                    )}
                </div>

                {/* Muestra la tabla de pedidos */}
                {!addOrder && !editOrder && (
                    <div className="overflow-x-auto">
                        <TableOrders />
                    </div>
                )}


                {/* Muestra el formulario de agregar pedido */}
                {addOrder && !editOrder && (
                    <div className="mt-4">
                        <AddOrder />
                    </div>
                )}

                {/* Muestra detalles del pedido*/}
                {editOrder && (
                    <div className="mt-4">
                        <OrderDetails />
                    </div>
                )}
            </div>
        </div>
    );
}
