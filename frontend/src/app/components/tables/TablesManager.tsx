import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useTableStore from '../../store/TableStore';
import { Table, TablePosition } from '../../types/table.types';

// Componentes modulares
import TablesHeader from './TablesHeader';
import TablesLayout from './TablesLayout';
import TablesList from './TablesList';
import TableForm from './TableForm';

const TablesManager: React.FC = () => {
  const navigate = useNavigate();
  const { tables, fetchTables, updateTablePosition, saveTableLayout, addTable, updateTableStatus } = useTableStore();
  
  const [tablesWithPositions, setTablesWithPositions] = useState<Table[]>([]);
  const [showTableForm, setShowTableForm] = useState<boolean>(false);
  const [tableToEdit, setTableToEdit] = useState<Table | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Cargar mesas iniciales y sus posiciones guardadas
  useEffect(() => {
    const loadTables = async (): Promise<void> => {
      await fetchTables();
    };
    
    loadTables();
  }, [fetchTables]);
  
  // Cuando se cargan las mesas, establecer posiciones iniciales si no existen
  useEffect(() => {
    if (tables.length > 0) {
      // Inicializar posiciones si no existen
      const tablesWithPos = tables.map((table, index) => {
        if (!table.position) {
          // Distribuir mesas en una cuadrícula si no tienen posiciones guardadas
          const col = index % 3;
          const row = Math.floor(index / 3);
          return {
            ...table,
            position: {
              x: 50 + col * 150,
              y: 50 + row * 150
            }
          };
        }
        return table;
      });
      
      setTablesWithPositions(tablesWithPos);
    }
  }, [tables]);
  
  // Mover una mesa a una nueva posición
  const moveTable = (index: number, left: number, top: number): void => {
    const updatedTables = [...tablesWithPositions];
    if (updatedTables[index].position) {
      updatedTables[index].position = {
        x: left,
        y: top
      };
      
      setTablesWithPositions(updatedTables);
      updateTablePosition(updatedTables[index].id, { x: left, y: top });
    }
  };
  
  // Guardar la disposición actual de las mesas
  const handleSaveLayout = (): void => {
    saveTableLayout(tablesWithPositions);
    setSuccessMessage("Disposición guardada con éxito");
    setTimeout(() => setSuccessMessage(null), 3000);
  };
  
  // Navegar a los detalles del pedido
  const openOrderDetails = (orderId: number | string): void => {
    navigate(`/dashboard/orders/details/${orderId}`);
  };
  
  // Mostrar formulario para añadir mesa
  const handleAddTable = (): void => {
    setTableToEdit(null);
    setShowTableForm(true);
  };
  
  // Mostrar formulario para editar mesa
  const handleEditTable = (table: Table): void => {
    setTableToEdit(table);
    setShowTableForm(true);
  };
  
  // Guardar nueva mesa o actualizar existente
  const handleSaveTable = async (tableData: Omit<Table, 'id' | 'position' | 'pedidoId'>): Promise<void> => {
    try {
      if (tableToEdit) {
        // Actualizar mesa existente
        await updateTableStatus(tableToEdit.id, tableData.estado);
        
        // Actualizar localmente
        const updatedTables = tablesWithPositions.map(table => {
          if (table.id === tableToEdit.id) {
            return {
              ...table,
              ...tableData
            };
          }
          return table;
        });
        
        setTablesWithPositions(updatedTables);
        setSuccessMessage("Mesa actualizada con éxito");
      } else {
        // Crear nueva mesa
        await addTable(tableData);
        setSuccessMessage("Mesa añadida con éxito");
      }
      
      // Cerrar formulario y limpiar estado
      setShowTableForm(false);
      setTableToEdit(null);
      
      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error al guardar mesa:", error);
    }
  };
  
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
      <TablesHeader 
        onSaveLayout={handleSaveLayout} 
        onAddTable={handleAddTable} 
      />
      
      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded dark:bg-green-800 dark:text-green-200">
          {successMessage}
        </div>
      )}
      
      {/* Formulario de Mesa (Modal) */}
      {showTableForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <TableForm 
              tableToEdit={tableToEdit}
              onSave={handleSaveTable}
              onCancel={() => setShowTableForm(false)}
            />
          </div>
        </div>
      )}
      
      {/* Área de mesas con DnD */}
      <DndProvider backend={HTML5Backend}>
        <TablesLayout 
          tables={tablesWithPositions} 
          moveTable={moveTable}
          openOrderDetails={openOrderDetails}
        />
      </DndProvider>
      
      {/* Tabla de mesas */}
      <TablesList 
        tables={tablesWithPositions} 
        onEditTable={handleEditTable}
        openOrderDetails={openOrderDetails}
      />
    </div>
  );
};

export default TablesManager;