import React, { useMemo, useEffect } from "react";
import DynamicTable from "../DynamicTable";
import useProductStore from "../../store/ProductStore";

function TableProducts() {
  // Extraer productos y la función fetch desde Zustand
  const { products, fetchProducts, deleteProduct } = useProductStore();

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, []);

  // Función para manejar la acción de editar un producto
  const handleEditClick = (product) => {
    console.log("Editar producto in table component:", product);
    // Aquí puedes abrir un modal, redireccionar a otra ruta, etc.
  };

  //funcion para manejar el eliminar un producto
  const handleDeleteClick = (product) => {
    console.log("Eliminar producto in table component:", product);
    deleteProduct(product.id);
  };

  // Configuración de las columnas de la tabla
  const columnsConfig = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        meta: { align: "text-left" },
      },
      {
        header: "Nombre",
        accessorKey: "nombre",
        meta: { align: "text-left" },
      },
      {
        header: "Categoría",
        accessorKey: "categoria_nombre",
        meta: { align: "text-left" },
      },
      {
        header: "Precio",
        accessorKey: "precio",
        // Formatea el precio a dos decimales y lo antepone con '$'
        cell: (info) => `$${Number(info.getValue()).toFixed(2)}`,
        meta: { align: "text-right" },
      },
      {
        header: "Stock",
        accessorKey: "stock",
        // Muestra el stock con estilos condicionales: si es menor a 10 se destaca en rojo
        cell: (info) => {
          const stock = info.getValue();
          return (
            <span
              className={
                stock < 10
                  ? "text-red-600 font-bold"
                  : "text-gray-800 dark:text-gray-200"
              }>
              {stock}
            </span>
          );
        },
        meta: { align: "text-right" },
      },
      {
        header: "Acciones",
        // Esta columna no necesita un accessorKey, ya que se renderiza con base en toda la fila
        cell: ({ row }) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => handleEditClick(row.original)}
              className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-300">
              Editar
            </button>
            <button
              onClick={() => handleDeleteClick(row.original)}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-300">
              Eliminar
            </button>
          </div>
        ),
        meta: { align: "text-center" },
      },
    ],
    [handleEditClick],
    [handleDeleteClick]
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tabla de Productos</h1>
      <DynamicTable
        columnsConfig={columnsConfig}
        data={products}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
}

export default TableProducts;
