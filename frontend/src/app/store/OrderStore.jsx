import { create } from "zustand";
import * as orderService from "../components/orders/services/orderService";

const useOrderStore = create((set, get) => ({
    // Estado para almacenar los pedidos
    orders: [],
    //estado para almacenar la order a editar
    orderToDetails: null,
    //estado inicial para mostrar el formulario de agregar pedido
    addOrder: false,
    //estado inicial para mostrar el formulario de editar pedido
    editOrder: false,
    //estado para los detalles del formulario
    detailsOrder: false,



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
    //opcion para setear la order a editar
    setOrderToEdit: (order) => {
        set({ orderToDetails: order });
        console.log("array order details:", order);
    },
    //opcion para setear la order a detalles
    setOrderToDetails: (value) => {
        set({ detailsOrder: value });
        console.log("order details:", value);
    },

    //get orders
    fetchOrders: async () => {
        try {
            const data = await orderService.getOrders();
            const formattedOrders = data.orders.map(order => ({
                ...order,
                date: new Date(order.date).toLocaleString('es-CO', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                })
            }));
            set({ orders: formattedOrders });
            console.log("Pedidos cargados:", formattedOrders);
        } catch (error) {
            console.error("Error al cargar los pedidos:", error);
        }
    },

}));

export default useOrderStore;