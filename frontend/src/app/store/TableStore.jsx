import { create } from 'zustand';
import { getMesas } from '../components/orders/services/mesasService';

const useTableStore = create((set, get) => ({
    // Estado inicial
    tables: [], // Inicializamos con un array vacío
    loading: false,
    error: null,
    selectedTable: null,

    // Acción para obtener todas las mesas
    fetchTables: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getMesas();
            console.log('response api:', response);
            // Verificar que la respuesta sea un array
            const tables = Array.isArray(response) ? response : (response && Array.isArray(response.data)) ? response.data : [];
            console.log('Mesas cargadas store:', tables);

            set({
                tables: tables,
                loading: false
            });
            console.log('Mesas cargadas:', tables);
            return tables;
        } catch (error) {
            console.error('Error al cargar las mesas:', error);
            set({
                error: 'Error al cargar las mesas. Por favor, intente de nuevo más tarde.',
                loading: false
            });
            throw error;
        }
    },

    // Obtener solo mesas disponibles
    getAvailableTables: () => {
        const { tables } = get();
        // Verificar que tables sea un array antes de usar filter
        if (!Array.isArray(tables)) {
            console.warn('tables no es un array:', tables);
            return [];
        }
        return tables.filter(table => table.status === 'disponible');
        console.log('Mesas cargadas:', tables);
    },

    // Acción para seleccionar una mesa
    selectTable: (tableId) => {
        const { tables } = get();
        // Verificar que tables sea un array antes de usar find
        if (!Array.isArray(tables)) {
            console.warn('tables no es un array:', tables);
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

    // Acción para actualizar el estado de una mesa (si tu API soporta esto)
    updateTableStatus: async (tableId, newStatus) => {
        set({ loading: true, error: null });
        try {
            // Aquí iría la llamada a la API para actualizar el estado
            // Por ahora, solo actualizamos el estado local
            set(state => {
                // Verificar que tables sea un array antes de usar map
                if (!Array.isArray(state.tables)) {
                    console.warn('state.tables no es un array:', state.tables);
                    return { ...state, loading: false };
                }

                return {
                    tables: state.tables.map(table =>
                        table.id === tableId ? { ...table, status: newStatus } : table
                    ),
                    loading: false
                };
            });

            // Si la mesa actualizada es la seleccionada, actualizamos también selectedTable
            const { selectedTable } = get();
            if (selectedTable && selectedTable.id === tableId) {
                set({ selectedTable: { ...selectedTable, status: newStatus } });
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la mesa:', error);
            set({
                error: 'Error al actualizar el estado de la mesa. Por favor, intente de nuevo.',
                loading: false
            });
            throw error;
        }
    },

    // Acción para agregar una mesa (domicilio)
    addDomicilioTable: () => {
        return {
            id: 1, // ID fijo para domicilio
            number: 0, // Número 0 indica domicilio
            name: 'Domicilio',
            status: 'disponible'
        };
    }
}));

export default useTableStore;