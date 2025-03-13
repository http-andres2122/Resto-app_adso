import React from 'react';
import useOrderStore from '../../store/OrderStore';
const OrderDetails = () => {
    const { setEditOrder } = useOrderStore();

    const order = {
        id: 12345,
        date: '2024-10-28',
        status: 'Pendiente',
        customer: {
            name: 'Juan Pérez',
            email: 'juan@email.com',
            id: '123456789',
            phone: '1234567890',
        },
        shippingAddress: 'Calle Falsa 123',
        items: [
            { id: 1, name: 'Producto A', quantity: 2, price: 50 },
            { id: 2, name: 'Producto B', quantity: 1, price: 30 },
        ],
        total: 130,
        shippingDate: '2024-10-29',
        trackingNumber: '1Z2X3C4V5B',
    };

    //opcion para cerrar
    const onCancel = () => {
        console.log("Cancelar");
        setEditOrder(false);
    };



    return (
        <div className="container mx-auto p-4">
            {/* Encabezado del Pedido */}
            <h1 className="text-2xl font-bold mb-4">Pedido #{order.id}</h1>
            <p className="text-gray-600 mb-2">Fecha: {order.date} | Estado: {order.status}</p>

            {/* Información del Cliente */}
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Cliente</h2>
                <p>Nombre: {order.customer.name}</p>
                <p>Identificación: {order.customer.id}</p>
                <p>Teléfono: {order.customer.phone}</p>
                <p>Email: {order.customer.email}</p>
                <p>Dirección: {order.shippingAddress}</p>
            </div>

            {/* Detalles del Producto/Servicio */}
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Productos</h2>
                <ul className="list-disc list-inside">
                    {order.items.map((item) => (
                        <li key={item.id}>
                            {item.name} (Cantidad: {item.quantity}) - ${item.price * item.quantity}
                        </li>
                    ))}
                </ul>
                <p className="mt-2">Total: ${order.total}</p>
            </div>

            {/* Historial del Pedido */}
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Historial</h2>
                <p>Enviado el: {order.shippingDate} | Tracking: {order.trackingNumber}</p>
            </div>

            {/* Opciones y Acciones */}
            <div className="flex space-x-2">

                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsEditing(true)}
                >
                    Editar Pedido
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

export default OrderDetails;