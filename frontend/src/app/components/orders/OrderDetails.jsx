import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useOrderStore from '../../store/OrderStore';

export default function OrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { orders, fetchOrders } = useOrderStore();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar los datos del pedido usando el store de Zustand
    useEffect(() => {
        const getOrderFromStore = async () => {
            if (!orderId) return;

            try {
                setLoading(true);
                // Primero aseguramos que tenemos los pedidos en el store
                await fetchOrders();
                // Buscamos el pedido por ID en el array de pedidos del store
                const foundOrder = orders.find(o => o.id === parseInt(orderId) || o.id === orderId);

                if (foundOrder) {
                    setOrder(foundOrder);
                    setLoading(false);
                } else {
                    throw new Error("Pedido no encontrado");
                }
            } catch (err) {
                console.error("Error al cargar el pedido:", err);
                setError("No se pudo cargar la información del pedido");
                setLoading(false);
            }
        };

        getOrderFromStore();
    }, [orderId, orders, fetchOrders]);

    // Función para navegar a la página de edición
    const handleEditClick = () => {
        navigate(`/dashboard/orders/edit/${orderId}`);
    };

    // Función para volver a la lista de pedidos
    const handleBackToList = () => {
        navigate('/dashboard/orders');
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Cargando detalles del pedido...</h2>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <div className="text-red-500">{error || "No se encontró el pedido"}</div>
                <button
                    onClick={handleBackToList}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Volver a la lista
                </button>
            </div>
        );
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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
            </div>
            <p className="text-gray-600 mb-2">Fecha: {order.date} | Estado: {order.status}</p>

            {/* Información del Cliente */}
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Cliente</h2>
                <p>ID Interno cliente: {order.customer.id}</p>
                <p>Nombre: {order.customer.full_name}</p>
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
                    {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                            <li key={index}>
                                {item.name} (Cantidad: {item.quantity}) - ${item.price * item.quantity}
                            </li>
                        ))
                    ) : (
                        <li>No hay productos en este pedido.</li>
                    )}
                </ul>
                <p className="mt-2">Total: ${order.total}</p>
            </div>

            {/* Opciones y Acciones */}
            <div className="flex space-x-2">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleEditClick}
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
                    onClick={handleBackToList}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

