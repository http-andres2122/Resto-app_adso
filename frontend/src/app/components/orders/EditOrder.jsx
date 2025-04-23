import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormOrders from "./FormOrders";
import useOrderStore from "../../store/OrderStore";

export default function EditOrder() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { orders, fetchOrders, updateOrder } = useOrderStore();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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

    const handleSubmit = async (updatedOrder) => {
        try {
            // Actualizar el pedido con la API y en el store local
            await updateOrder(orderId, updatedOrder);
            setSuccessMessage("Pedido actualizado con éxito");

            // Redirigir a la página de detalles después de una actualización exitosa
            setTimeout(() => {
                navigate(`/dashboard/orders/details/${orderId}`);
            }, 1500);
        } catch (err) {
            console.error("Error en actualización:", err);
            setError("Error al actualizar el pedido: " + (err.message || "Error desconocido"));
        }
    };

    const handleCancel = () => {
        navigate(`/dashboard/orders/details/${orderId}`);
    };

    if (loading) {
        return (
            <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h2 className="text-3xl font-bold mb-6">Cargando pedido...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h2 className="text-3xl font-bold mb-6">Error</h2>
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-500 text-white font-semibold rounded"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Editar Pedido #{orderId}</h2>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            {order && (
                <FormOrders
                    initialOrder={order}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                    isEditing={true}
                />
            )}
        </div>
    );
}
