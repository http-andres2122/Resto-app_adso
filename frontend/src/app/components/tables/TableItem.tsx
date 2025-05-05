import React from 'react';
import { useDrag } from 'react-dnd';
import { Table, TablePosition } from '../../types/table.types';

interface TableItemProps {
  table: Table;
  index: number;
  moveTable: (index: number, left: number, top: number) => void;
  openOrderDetails: (orderId: number | string) => void;
}

const TableItem: React.FC<TableItemProps> = ({ table, index, moveTable, openOrderDetails }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'table',
    item: { id: table.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Determinar clases basadas en el estado de la mesa
  const getTableStatusClass = (status: string): string => {
    switch (status) {
      case 'disponible':
        return 'bg-green-100 border-green-500';
      case 'ocupada':
        return 'bg-red-100 border-red-500';
      case 'reservada':
        return 'bg-yellow-100 border-yellow-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  // Manejar el clic en la mesa para ver detalles del pedido (si está ocupada)
  const handleTableClick = (): void => {
    if (table.estado === 'ocupada' && table.pedidoId) {
      openOrderDetails(table.pedidoId);
    }
  };

  return (
    <div
      ref={drag}
      className={`absolute table-item cursor-move ${getTableStatusClass(table.estado)}`}
      style={{
        left: `${table.position?.x || 0}px`,
        top: `${table.position?.y || 0}px`,
        opacity: isDragging ? 0.5 : 1,
        width: `${80 + table.capacidad * 10}px`,
        height: `${80 + table.capacidad * 5}px`,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s',
        zIndex: isDragging ? 1000 : 1,
      }}
      onClick={handleTableClick}
    >
      <div className="font-bold text-lg">{table.numero}</div>
      <div className="mt-1 text-sm">{table.capacidad} personas</div>
      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">{table.ubicacion}</div>
      <div className={`mt-2 text-xs font-semibold rounded-full px-2 py-1 ${
        table.estado === 'disponible' ? 'bg-green-500 text-white' :
        table.estado === 'ocupada' ? 'bg-red-500 text-white' :
        'bg-yellow-500 text-white'
      }`}>
        {table.estado}
      </div>
    </div>
  );
};

export default TableItem;