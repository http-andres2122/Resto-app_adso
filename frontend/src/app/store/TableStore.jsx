import { create } from 'zustand';
import { getMesas } from '../components/orders/services/mesasService';

const useTableStore = create((set, get) => ({
    // Estado inicial
    tables: [], // Inicializamos con un array vacío
    loading: false,
    error: null,
    selectedTable: null,
    lastFetch: null, // Timestamp de la última carga

    // Acción para obtener todas las mesas
    fetchTables: async () => {
        const { lastFetch } = get();
        const now = Date.now();
        if (lastFetch && now - lastFetch < 60000) return; // Evita recargar si los datos tienen menos de 1 minuto
        set({ loading: true, error: null });
        try {
            const response = await getMesas();
            console.log('API response raw:', response);

            // Simplificar el procesamiento, asumiendo que response es directamente un array
            let tables = response.tables;

            // En caso de que no sea un array, asignar uno vacío
            if (!Array.isArray(tables)) {
                console.warn('Response is not an array, using empty array instead');
                tables = [];
            }

            console.log('Tables after processing:', tables);

            // Asegurarnos de que cada mesa tiene una propiedad name
            const tablesWithNames = tables.map(table => {
                if (!table.name) {
                    return {
                        ...table,
                        name: table.number === 0 ? 'Domicilio' : `Mesa ${table.number}`
                    };
                }
                return table;
            });

            // Guardar en el estado
            set({
                tables: tablesWithNames,
                loading: false,
                lastFetch: now
            });

            return tablesWithNames;
        } catch (error) {
            console.error('Error al cargar las mesas:', error);
            set({
                tables: null,
                error: 'Error al cargar las mesas. Mostrando datos de ejemplo.',
                loading: false
            });

            return sampleTables;
        }
    },

    // Obtener solo mesas disponibles
    getAvailableTables: () => {
        const { tables } = get();
        console.log('Current tables in getAvailableTables:', tables);

        // Verificar que tables sea un array antes de usar filter
        if (!Array.isArray(tables)) {
            console.warn('tables no es un array:', tables);
            return [];
        }

        // Filtrar mesas disponibles
        const availableTables = tables.filter(table =>
            table && typeof table === 'object' && table.status === 'disponible'
        );

        console.log('Available tables after filtering:', availableTables);
        return availableTables;
    },

    // Acción para seleccionar una mesa
    selectTable: (tableId) => {
        const { tables } = get();
        if (!Array.isArray(tables)) {
            return null;
        }
        const selectedTable = tables.find(table => table.id === tableId);
        set({ selectedTable });
        return selectedTable;
    },

    // Acción para limpiar la selección
    clearSelectedTable: () => {
        set({ selectedTable: null });
    },

    // Acción para actualizar el estado de una mesa
    updateTableStatus: async (tableId, newStatus) => {
        set({ loading: true, error: null });
        try {
            set(state => ({
                tables: Array.isArray(state.tables)
                    ? state.tables.map(table =>
                        table.id === tableId ? { ...table, status: newStatus } : table
                    )
                    : [],
                loading: false
            }));

            const { selectedTable } = get();
            if (selectedTable && selectedTable.id === tableId) {
                set({ selectedTable: { ...selectedTable, status: newStatus } });
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la mesa:', error);
            set({
                error: 'Error al actualizar el estado de la mesa.',
                loading: false
            });
        }
    },

    // Acción para agregar una mesa (domicilio)
    addDomicilioTable: () => {
        return {
            id: 1,
            number: 0,
            name: 'Domicilio',
            status: 'disponible'
        };
    }
}));

export default useTableStore;