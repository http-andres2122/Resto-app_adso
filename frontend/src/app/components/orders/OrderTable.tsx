import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTableStore from '../../store/TableStore';
import useOrderStore from '../../store/OrderStore';
import { Table } from '../../types/table.types';

interface OrderData {
    cliente: string;
    productos: any[];
    total: number;
    estado: string;
    mesa?: number | string;
    fecha?: string;
}

const OrderTable: React.FC = () => {
    const { tables, fetchTables, updateTableStatus } = useTableStore();
    const { createOrder } = useOrderStore();
    const navigate = useNavigate();
    const [selectedTable, setSelectedTable] = useState<number | string | null>(null);
    const [orderData, setOrderData] = useState<OrderData>({
        cliente: '',
        productos: [],
        total: 0,
        estado: 'pendiente'
    });

    // Cargar mesas al montar el componente
    useEffect(() => {
        fetchTables();
    }, [fetchTables]);

    // Filtrar solo mesas disponibles
    const availableTables = tables.filter(table => table.estado === 'disponible');

    const handleTableSelect = (tableId: number | string) => {
        setSelectedTable(tableId);
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedTable) {
            alert('Por favor seleccione una mesa');
            return;
        }

        try {
            // Crear la orden
            const orderResponse = await createOrder({
                ...orderData,
                mesa: selectedTable,
                fecha: new Date().toISOString()
            });

            // Actualizar el estado de la mesa a 'ocupada' y asociar la orden
            await updateTableStatus(selectedTable, 'ocupada', orderResponse.id);

            // Redirigir a la vista de la orden
            navigate(`/dashboard/orders/details/${orderResponse.id}`);
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold mb-6">Crear Nuevo Pedido</h2>

            {/* Formulario para datos de la orden */}
            <form onSubmit={handleOrderSubmit}>
                {/* Campos del formulario de orden */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Cliente</label>
                    <input
                        type="text"
                        value={orderData.cliente}
                        onChange={(e) => setOrderData({ ...orderData, cliente: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Más campos aquí según necesidad */}

                <h3 className="text-xl font-bold mb-4 mt-6">Seleccionar Mesa</h3>

                {/* Selector visual de mesas */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {availableTables.length > 0 ? (
                        availableTables.map(table => (
                            <div
                                key={table.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTable === table.id
                                        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400'
                                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                                    }`}
                                onClick={() => handleTableSelect(table.id)}
                            >
                                <div className="font-bold">{table.numero}</div>
                                <div className="text-sm">{table.capacidad} personas</div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-4 text-gray-500 dark:text-gray-400">
                            No hay mesas disponibles en este momento
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/orders')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={!selectedTable}
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${!selectedTable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500'
                            }`}
                    >
                        Crear Pedido
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderTable;