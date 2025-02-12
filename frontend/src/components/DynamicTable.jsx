import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function DynamicTable({
  columnsConfig,
  data,
  handleEditClick,
  handleDeleteClick,
}) {
  // Memoizamos las columnas para evitar re-renderizados innecesarios
  const columns = useMemo(() => columnsConfig, [columnsConfig]);

  // Creamos la instancia de la tabla con TanStack Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  // Aquí puedes definir clases por columna; en este ejemplo se usan todas iguales
                  className="px-6 py-3 text-left text-gray-700 dark:text-gray-200 font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t dark:border-gray-600">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  // Aquí se asignan clases base para cada celda;
                  // si se necesita alineación o estilos específicos, se puede configurar en el columnDef
                  className={`px-6 py-4 text-gray-800 dark:text-gray-200 ${
                    cell.column.columnDef.meta?.align || "text-left"
                  }`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
