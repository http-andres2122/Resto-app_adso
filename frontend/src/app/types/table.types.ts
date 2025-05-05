export interface TablePosition {
  x: number;
  y: number;
}

export interface Table {
  id: number | string;
  numero: string;
  capacidad: number;
  estado: "disponible" | "ocupada" | "reservada";
  ubicacion?: string;
  position?: TablePosition;
  pedidoId?: number | string;
}

export interface TableStore {
  tables: Table[];
  tableToEdit: Table | null;
  lastFetch: number | null;
  fetchTables: () => Promise<void>;
  updateTablePosition: (
    tableId: number | string,
    position: TablePosition
  ) => void;
  saveTableLayout: (tables: Table[]) => boolean | Promise<boolean>;
  updateTableStatus: (
    tableId: number | string,
    newStatus: string,
    orderId?: number | string
  ) => Promise<boolean>;
  addTable: (tableData: Partial<Table>) => Promise<any>;
}
