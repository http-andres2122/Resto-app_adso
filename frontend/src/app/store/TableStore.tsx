import { create } from "zustand";
import * as mesasService from "../components/tables/services/mesasService";
import { Table, TablePosition, TableStore } from "../types/table.types";

const useTableStore = create<TableStore>((set, get) => ({
    tables: [],
    tableToEdit: null,
    lastFetch: null,

    // Cargar todas las mesas
    fetchTables: async () => {
        const { lastFetch } = get();
        const now = Date.now();
        if (lastFetch && now - lastFetch < 60000) return; // Evita recargar si los datos tienen menos de 1 minuto

        try {
            const data = await mesasService.getMesas();

            // Recuperar las posiciones guardadas en localStorage
            let savedPositions: Record<string | number, TablePosition> = {};
            try {
                const savedLayout = localStorage.getItem('tablePositions');
                if (savedLayout) {
                    savedPositions = JSON.parse(savedLayout);
                }
            } catch (e) {
                console.error("Error al recuperar posiciones de mesas:", e);
            }

            // Combinar datos de las mesas con posiciones guardadas
            const tablesWithPositions: Table[] = data.mesas.map((table: any) => {
                return {
                    ...table,
                    position: savedPositions[table.id] || null,
                    // Asignamos un pedidoId temporal para las mesas ocupadas en testing
                    // En producción, estos datos vendrían del backend
                    pedidoId: table.estado === 'ocupada' ? `order-${table.id}` : null,
                    // Agregamos una ubicación por defecto si la columna es nueva
                    ubicacion: table.ubicacion || 'Área general'
                };
            });

            set({ tables: tablesWithPositions, lastFetch: now });
            console.log("Mesas cargadas:", tablesWithPositions);
        } catch (error) {
            console.error("Error al cargar las mesas:", error);
        }
    },

    // Actualizar posición de una mesa individual
    updateTablePosition: (tableId, position) => {
        // Guardar la posición en localStorage
        try {
            const savedLayout = localStorage.getItem('tablePositions');
            let positions: Record<string | number, TablePosition> = {};

            if (savedLayout) {
                positions = JSON.parse(savedLayout);
            }

            positions[tableId] = position;
            localStorage.setItem('tablePositions', JSON.stringify(positions));

            console.log(`Posición de mesa ${tableId} actualizada:`, position);
        } catch (e) {
            console.error("Error al guardar posición de mesa:", e);
        }
    },

    // Guardar la disposición completa de las mesas
    saveTableLayout: (tables) => {
        try {
            // Extraer solo los IDs y posiciones para guardar en localStorage
            const positions: Record<string | number, TablePosition> = {};
            tables.forEach(table => {
                if (table.position) {
                    positions[table.id] = table.position;
                }
            });

            localStorage.setItem('tablePositions', JSON.stringify(positions));
            console.log("Disposición de mesas guardada");

            // También podríamos enviar esta información al backend
            // para guardarla permanentemente, ejemplo:
            // await mesasService.saveTableLayout(positions);

            return true;
        } catch (error) {
            console.error("Error al guardar la disposición de mesas:", error);
            return false;
        }
    },

    // Actualizar estado de una mesa
    updateTableStatus: async (tableId, newStatus, orderId = undefined) => {
        try {
            // Llamar al servicio para actualizar la mesa en el backend
            await mesasService.updateMesa(tableId, { estado: newStatus, orderId });

            // Actualizar estado local
            const { tables } = get();
            const updatedTables = tables.map(table => {
                if (table.id === tableId) {
                    return {
                        ...table,
                        estado: newStatus as 'disponible' | 'ocupada' | 'reservada',
                        pedidoId: orderId
                    };
                }
                return table;
            });

            set({ tables: updatedTables });
            console.log(`Estado de mesa ${tableId} actualizado a ${newStatus}`);
            return true;
        } catch (error) {
            console.error("Error al actualizar estado de mesa:", error);
            return false;
        }
    },

    // Añadir nueva mesa
    addTable: async (tableData) => {
        try {
            const response = await mesasService.createMesa(tableData);

            // Recargar las mesas para incluir la nueva
            const { fetchTables } = get();
            await fetchTables();

            return response;
        } catch (error) {
            console.error("Error al crear nueva mesa:", error);
            throw error;
        }
    }
}));

export default useTableStore;