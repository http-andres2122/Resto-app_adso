import { create } from "zustand";
import * as orderService from "../components/orders/services/orderService";

const useOrderStore = create((set, get) => ({
    // Estado para almacenar los pedidos
    orders: [],
    //estado para almacenar la order a editar
    orderToEdit: [],
    //estado inicial para mostrar el formulario de agregar pedido
    addOrder: false,
    //estado inicial para mostrar el formulario de editar pedido
    editOrder: false,
    //estado para los detalles del formulario
    detailsOrder: false,
    // Timestamp de la última carga
    lastFetch: null,

    //opcion de mostrar el formulario de agregar pedido
    setAddOrder: (value) => {
        set({ addOrder: value, editOrder: false, detailsOrder: false, orderToEdit: [] });
        console.log(" set agregar pedido:", value);
    },
    //opcion de mostrar el formulario de editar pedido
    setEditOrder: (value) => {
        set({ editOrder: value, addOrder: false, detailsOrder: !value });
        console.log("set editar pedido:", value);
    },
    //opcion para setear orderToEdit segun la orden
    setOrderToEdit: (order) => {
        set({ orderToEdit: order });
        console.log("array order details:", order);
    },
    //opcion para setear detailsOrder segun el valor y mostrar el formulario de detalles
    setDetailsOrder: (value) => {
        set({ detailsOrder: value, addOrder: false, editOrder: false });
        console.log("order details:", value);
    },

    //get orders
    fetchOrders: async () => {
        const { lastFetch } = get();
        const now = Date.now();
        if (lastFetch && now - lastFetch < 60000) return; // Evita recargar si los datos tienen menos de 1 minuto
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
            set({ orders: formattedOrders, lastFetch: now });
            console.log("Pedidos cargados:", formattedOrders);
        } catch (error) {
            console.error("Error al cargar los pedidos:", error);
        }
    },

    //create order
    createOrder: async (data) => {
        try {
            const response = await orderService.createPedido(data);
            console.log("Pedido creado:", response);

            // Actualizar el estado local después de crear una orden
            const { fetchOrders } = get();
            await fetchOrders(); // Recargar las órdenes para incluir la nueva

            set({ addOrder: false });
        } catch (error) {
            console.error("Error al crear el pedido:", error);
        }
    },

    //update order
    updateOrder: async (id, data) => {
        try {
            const response = await orderService.updatePedido(id, data);
            console.log("Pedido actualizado:", response);

            // Actualizar el estado local después de actualizar en el backend
            const { orders } = get();
            const updatedOrders = orders.map(order => {
                if (order.id === id || order.id === parseInt(id)) {
                    return {
                        ...order,
                        ...data
                    };
                }
                return order;
            });

            set({
                orders: updatedOrders,
                editOrder: false,
                orderToEdit: []
            });

            console.log("Estado local actualizado con éxito");
        } catch (error) {
            console.error("Error al actualizar el pedido:", error);
        }
    },

    // Actualizar el estado local forzando un nuevo fetch
    refreshOrders: async () => {
        set({ lastFetch: null });
        const { fetchOrders } = get();
        await fetchOrders();
    }
}));

export default useOrderStore;