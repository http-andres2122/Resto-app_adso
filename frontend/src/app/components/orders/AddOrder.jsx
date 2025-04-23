import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormOrders from "./FormOrders";
import useOrderStore from "../../store/OrderStore";

export default function AddOrder() {
    const navigate = useNavigate();
    const { createOrder } = useOrderStore();

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (data) => {
        try {
            await createOrder(data);
            setSuccessMessage("Pedido creado con éxito");
            // Redirigir después de un breve delay para mostrar el mensaje
            setTimeout(() => {
                navigate("/dashboard/orders");
            }, 1500);
        } catch (err) {
            setError("Error al crear el pedido: " + err.message);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard/orders");
    };

    return (
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Agregar Pedido</h2>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                    Volver a la lista
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <FormOrders
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                isEditing={false}
            />
        </div>
    );
}
