import React from 'react';
import { useDrop } from 'react-dnd';
import { Table } from '../../types/table.types';
import TableItem from './TableItem';

interface TablesLayoutProps {
  tables: Table[];
  moveTable: (index: number, left: number, top: number) => void;
  openOrderDetails: (orderId: number | string) => void;
}

const TablesLayout: React.FC<TablesLayoutProps> = ({ tables, moveTable, openOrderDetails }) => {
  const [, drop] = useDrop({
    accept: 'table',
    drop: (item: { id: number | string; index: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && tables[item.index].position) {
        const left = Math.round(tables[item.index].position!.x + delta.x);
        const top = Math.round(tables[item.index].position!.y + delta.y);
        
        moveTable(item.index, left, top);
      }
      return undefined;
    },
  });

  return (
    <div 
      ref={drop} 
      className="relative bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
      style={{ 
        height: '600px', 
        width: '100%',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zm-16 4h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm-16 4h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-16 4h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z\' fill=\'%23d1d5db\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        backgroundSize: '20px 20px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {tables.map((table, i) => (
        <TableItem 
          key={table.id} 
          table={table} 
          index={i} 
          moveTable={moveTable}
          openOrderDetails={openOrderDetails}
        />
      ))}
    </div>
  );
};

export default TablesLayout;