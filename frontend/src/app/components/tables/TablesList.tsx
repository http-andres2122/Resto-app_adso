import React from 'react';
import { Table } from '../../types/table.types';

interface TablesListProps {
  tables: Table[];
  onEditTable: (table: Table) => void;
  openOrderDetails: (orderId: number | string) => void;
}

const TablesList: React.FC<TablesListProps> = ({ tables, onEditTable, openOrderDetails }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Vista de Lista</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold dark:text-gray-200">Número</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold dark:text-gray-200">Capacidad</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold dark:text-gray-200">Ubicación</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold dark:text-gray-200">Estado</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold dark:text-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((mesa) => (
              <tr key={mesa.id} className="border-t dark:border-gray-600">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{mesa.numero}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{mesa.capacidad} personas</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{mesa.ubicacion}</td>
                <td className={`px-6 py-4 text-center font-semibold ${
                  mesa.estado === 'disponible' ? 'text-green-500' :
                  mesa.estado === 'ocupada' ? 'text-red-500' :
                  'text-yellow-500'
                } dark:text-gray-200`}>
                  {mesa.estado}
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                    onClick={() => onEditTable(mesa)}
                  >
                    Editar
                  </button>
                  {mesa.estado === 'ocupada' && mesa.pedidoId && (
                    <button 
                      className="ml-2 px-4 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500"
                      onClick={() => openOrderDetails(mesa.pedidoId!)}
                    >
                      Ver Pedido
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablesList;