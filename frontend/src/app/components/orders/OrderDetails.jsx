import React, { useEffect } from 'react';
import useOrderStore from '../../store/OrderStore';


export default function OrderDetails() {
    const { setEditOrder, fetchOrders, orders, orderToEdit, setDetailsOrder, setOrderToEdit } = useOrderStore();
    console.log("order details module:", orderToEdit);

    const order = orderToEdit;


    //opcion para cerrar
    const onCancel = () => {
        console.log("Cancelar");
        setDetailsOrder(false);
    };

    //editar pedido
    const onEdit = () => {
        setEditOrder(true);
        setOrderToEdit(order);
    }

    // Función para determinar el tipo de servicio
    const determinarTipoServicio = () => {
        if (!order.table || !Array.isArray(order.table) || order.table.length === 0) {
            return 'No asignada';
        }

        // Buscar una mesa con número 0 e id 1 (que indica domicilio)
        const domicilio = order.table.find(mesa => mesa.number === 0 && mesa.id === 1);
        if (domicilio) {
            return 'Domicilio';
        }

        // Buscar mesas normales (con número mayor a 0)
        const mesas = order.table.filter(mesa => mesa.number > 0);
        if (mesas.length > 0) {
            if (mesas.length === 1) {
                return `Mesa ${mesas[0].number}`;
            } else {
                // Si hay múltiples mesas, mostrarlas todas
                return `Mesas: ${mesas.map(mesa => mesa.number).join(', ')}`;
            }
        }

        return 'No asignada';
    };

    return (
        <div className="container mx-auto p-4">
            {/* Encabezado del Pedido */}
            <h1 className="text-2xl font-bold mb-4">Pedido #{order.id}</h1>
            <p className="text-gray-600 mb-2">Fecha: {order.date} | Estado: {order.status}</p>

            {/* Información del Cliente */}
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Cliente</h2>
                <p>ID Interno cliente: {order.customer.id}</p>
                <p>Nombre: {order.customer.username}</p>
                <p>Identificación: {order.customer.num_doc}</p>
                <p>Teléfono: {order.customer.num_phone}</p>
                <p>Email: {order.customer.email}</p>
                <p>Dirección: {order.shippingAddress}</p>
            </div>

            {/* Información del Servicio */}
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Servicio</h2>
                <p>Mesa: {order.table_num || 'No asignada'}</p>
                <p>Observaciones: {order.comments || 'Sin observaciones'}</p>
            </div>


            {/* Detalles del Producto/Servicio */}
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Productos</h2>
                <ul className="list-disc list-inside">
                    {order.items.length > 0 ? (
                        order.items.map((item) => (
                            <li key={item.id}>
                                {item.name} (Cantidad: {item.quantity}) - ${item.price * item.quantity}
                            </li>
                        ))
                    ) : (
                        <li>No hay productos en este pedido.</li>
                    )}
                </ul>
                <p className="mt-2">Total: ${order.total}</p>
            </div>

            {/* Historial del Pedido */}
            {/* <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Historial</h2>
                <p>Enviado el: {order.shippingDate} | Tracking: {order.trackingNumber}</p>
            </div> */}

            {/* Opciones y Acciones */}
            <div className="flex space-x-2">

                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onEdit}
                >
                    Editar orden
                </button>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Imprimir Factura
                </button>
                {order.status === 'Pendiente' && (
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancelar Pedido
                    </button>
                )}
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onCancel}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

