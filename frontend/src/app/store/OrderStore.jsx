import { create } from "zustand";
import * as pedidoService from "../components/orders/services/pedidoService";

const useOrderStore = create((set, get) => ({
    orders: [],
    

}));

