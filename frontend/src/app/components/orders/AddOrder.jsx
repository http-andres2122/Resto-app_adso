import React from "react";
import FormOrders from "./FormOrders";
import useOrderStore from "../../store/OrderStore";

export default function AddOrder() {
    const { setAddOrder } = useOrderStore();

    const initialValues = {};

    const onCancel = () => {
        console.log("Cancelar");
        setAddOrder(false)
    }

    const onSubmit = (data) => {
       const order = {order: data};
        console.log("Datos 1 :", order);
    }


    return (
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <h2 className="text-3xl font-bold mb-6">Agregar Pedido </h2>
            <FormOrders
                onCancel={onCancel}
                onSubmit={onSubmit}
                initialValues={initialValues}
                submit_text="+ Agregar Pedido"
            />
        </div>
    )
}
