import { create } from "zustand";
import * as orderService from "../components/orders/services/orderService";

const useOrderStore = create((set, get) => ({
    // Estado para almacenar los pedidos
    orders: [],
    //estado para almacenar la order a editar
    orderToEdit: null,



    //estado inicial para mostrar el formulario de agregar pedido
    addOrder: false,
    //estado inicial para mostrar el formulario de editar pedido
    editOrder: false,
    //estado inicial para editar el pedido 
    orderToEdit: null,

    //opcion de mostrar el formulario de agregar pedido
    setAddOrder: (value) => {
        set({ addOrder: value });
        console.log("agregar pedido:", value);
    },
    //opcion de mostrar el formulario de editar pedido
    setEditOrder: (value) => {
        set({ editOrder: value });
        console.log("editar pedido:", value);
    },
}));

export default useOrderStore;