import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../shared/DynamicTable";
import useOrderStore from "../../store/OrderStore";

export default function TableOrders() {
    const { fetchOrders, orders } = useOrderStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const ordersFormat = orders.map((order) => ({
        ...order,
        id: order.id,
        customer: order.customer,
        items_lenght: order.items.length,
        total: order.total,
        status: order.status,
        date: order.date,
    }));

    // Función para manejar el click en detalles - ahora navega a una URL específica
    const handleDetailsClick = (order) => {
        navigate(`/dashboard/orders/details/${order.id}`);
    }

    // Función para manejar el click en cancelar
    const handleCancelClick = (order) => {
        console.log("Cancelar pedido:", order);
        // Aquí podría implementarse la lógica para cambiar el estado del pedido a cancelado
    }

    // Configuración de las columnas de la tabla
    const columnsConfig = useMemo(() => [
        {
            header: "ID Pedido",
            accessorKey: "id",
            meta: { align: "text-left" },
        },
        {
            header: "Cliente",
            accessorKey: "customer.full_name",
            meta: { align: "text-left" },
        },
        {
            header: "Ítems",
            accessorKey: "items_lenght",
            meta: { align: "text-left" },
        },
        {
            header: "Total",
            accessorKey: "total",
            // Formatea el total a dos decimales y lo antepone con '$'
            cell: (info) => `$${Number(info.getValue()).toFixed(2)}`,
            meta: { align: "text-left" },
        },
        {
            header: "Estado",
            accessorKey: "status",
            // Muestra el estado con estilos condicionales
            cell: (info) => {
                const status = info.getValue();
                switch (status) {
                    case "Pendiente":
                        return <span className="text-yellow-500 font-semibold">{status}</span>;
                    case "En preparación":
                        return <span className="text-blue-500 font-semibold">{status}</span>;
                    case "Entregado":
                        return <span className="text-green-500 font-semibold">{status}</span>;
                    default:
                        return <span className="text-gray-500">{status}</span>;
                }
            },
            meta: { align: "text-left" },
        },
        {
            header: "Fecha",
            accessorKey: "date",
            meta: { align: "text-left" },
        },
        {
            header: "Acciones",
            // Botones para detalles y cancelar (eliminado el botón de editar)
            cell: ({ row }) => (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => handleDetailsClick(row.original)}
                        className="px-3 py-1 text-sm bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500">
                        Detalles
                    </button>
                    <button
                        onClick={() => handleCancelClick(row.original)}
                        className="px-3 py-1 text-sm bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-500">
                        Cancelar
                    </button>
                </div>
            ),
            meta: { align: "text-center" },
        },
    ], [handleDetailsClick, handleCancelClick]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tabla de Pedidos</h1>
            <DynamicTable
                columnsConfig={columnsConfig}
                data={ordersFormat}
                handleDetailsClick={handleDetailsClick}
                handleCancelClick={handleCancelClick}
            />
        </div>
    );
}