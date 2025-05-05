import React from 'react';

interface TablesHeaderProps {
  onSaveLayout: () => void;
  onAddTable: () => void;
}

const TablesHeader: React.FC<TablesHeaderProps> = ({ onSaveLayout, onAddTable }) => {
  return (
    <>
      {/* Título y Controles */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Gestión de Mesas</h2>
        <div>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            onClick={onSaveLayout}
          >
            Guardar Disposición
          </button>
          <button 
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
            onClick={onAddTable}
          >
            Agregar Mesa
          </button>
        </div>
      </div>
      
      {/* Leyenda de estados */}
      <div className="flex mb-4 space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Ocupada</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
          <span>Reservada</span>
        </div>
      </div>
      
      {/* Instrucciones */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Arrastra las mesas para reorganizarlas. Haz clic en una mesa ocupada para ver detalles del pedido.
      </div>
    </>
  );
};

export default TablesHeader;