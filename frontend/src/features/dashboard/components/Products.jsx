import React from "react";
import { useNavigate } from "react-router-dom";
import TableProducts from "../../../app/components/products/TableProducts";

export default function Products() {
  const navigate = useNavigate();

  // Función para navegar a la página de agregar producto
  const handleAddProductClick = () => {
    navigate("/dashboard/products/add");
  };

  return (
    // Contenedor de la página
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {/* Título */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gestión de Productos</h2>
      </div>

      {/* Botón para agregar producto */}
      <div className="mb-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          onClick={handleAddProductClick}
        >
          + Agregar Producto
        </button>
      </div>

      {/* Tabla de Productos */}
      <div>
        <TableProducts />
      </div>
    </div>
  );
}
