import React, { useMemo, useEffect } from "react";
import DynamicTable from "../shared/DynamicTable";
import useOrderStore from "../../store/OrderStore";

export default function TableOrders() {
    //store zustand
    const { setEditOrder, setAddOrder, fetchOrders, orders, orderToDetails, setOrderToEdit, setOrderToDetails } = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, []);

    const ordersFormat = orders.map((order) => ({
        ...order,
        id: order.id,
        customer: order.customer,
        customerName: `${order.customer.first_name} ${order.customer.last_name}`, // Accede directamente a las propiedades del objeto
        items: order.items.length,
        total: order.total,
        status: order.status,
        date: order.date,
    }));

    //funcion para manejar el click en detalles
    const handleDetailsClick = (order) => {
        setOrderToDetails(true);
        setOrderToEdit(order);
        console.log("Detalles del pedido:", order);
    }

    //funcion para manejar el click en cancelar
    const handleCancelClick = (order) => {
        console.log("Cancelar pedido:", order);
    }

    //configuracion de las columnas de la tabla
    const columnsConfig = useMemo(() => [
        {
            header: "ID Pedido",
            accessorKey: "id",
            meta: { align: "text-left" },
        },
        {
            header: "Cliente",
            accessorKey: "customerName",
            meta: { align: "text-left" },
        },
        {
            header: "Ítems",
            accessorKey: "items",
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
            // Botones para detalles y cancelar
            cell: ({ row }) => (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => handleDetailsClick(row.original)}
                        className="px-4 py-2 text-sm bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500">
                        Detalles
                    </button>
                    <button
                        onClick={() => handleCancelClick(row.original)}
                        className="ml-2 px-4 py-2 text-sm bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-500">
                        Cancelar
                    </button>
                </div>
            ),
            meta: { align: "text-left" },
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