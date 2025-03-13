import React, { useRef } from "react";
import DynamicForm from "../shared/DynamicForm";


export default function FormOrders({ onCancel, onSubmit, initialValues, submit_text }) {
    //

    // Campos del formulario de pedidos
    const fieldsOrder = [
        { name: "id_card", label: "Identificacion", type: "number", required: true },
        { name: "customer", label: "Cliente", type: "text", required: true },
        { name: "email", label: "Correo electronico", type: "text", required: true },
        { name: "items", label: "Productos", type: "number", required: true },
    ];

    // Función para enviar el formulario
    const formRef = useRef();
    const handleSubmitForm = () => {
        console.log("Formulario:", formRef.current);
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };


    return (
        <div className="p-6">
            {/* Formulario */}
            <DynamicForm
                ref={formRef} // Referencia al formulario para poder enviarlo
                fields={fieldsOrder} // Campos del formulario de pedidos
                onSubmit={onSubmit} // funcion para recibir los datos del formulario
                initialValues={initialValues} // Valores iniciales del formulario
            />
            {/* Botones */}
            <div className="flex gap-2 mt-4">
                <button
                    type="button"
                    onClick={handleSubmitForm}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded"
                >
                    {submit_text}
                </button>

                {/* Botón para cancelar orden */}
                { }
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={null}
                >
                    Cancelar Pedido
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-500 text-white font-semibold rounded"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}