import React from "react";

export default function Products() {
  const products = [
    { id: 1, name: "Pizza Margarita", category: "Comida", price: 12.5, stock: 15 },
    { id: 2, name: "Coca-Cola 500ml", category: "Bebidas", price: 1.5, stock: 50 },
    { id: 3, name: "Hamburguesa Clásica", category: "Comida", price: 8.0, stock: 8 },
    { id: 4, name: "Ensalada César", category: "Comida", price: 5.0, stock: 12 },
    { id: 5, name: "Té Helado", category: "Bebidas", price: 2.0, stock: 25 },
  ];

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {/* Título */}
      < h2 className="text-3xl font-bold mb-6" > Gestión de Productos</h2 >

      {/* Botón para agregar producto */}
      < div className="mb-4" >
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
          + Agregar Producto
        </button>
      </div >

      {/* Tabla de Productos */}
      < div className="overflow-x-auto" >
        <table className="min-w-full bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200 font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200 font-semibold">Nombre</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200 font-semibold">Categoría</th>
              <th className="px-6 py-3 text-right text-gray-700 dark:text-gray-200 font-semibold">Precio</th>
              <th className="px-6 py-3 text-right text-gray-700 dark:text-gray-200 font-semibold">Stock</th>
              <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-200 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t dark:border-gray-600">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{product.id}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{product.name}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{product.category}</td>
                <td className="px-6 py-4 text-right text-gray-800 dark:text-gray-200">
                  ${product.price.toFixed(2)}
                </td>
                <td
                  className={`px-6 py-4 text-right ${product.stock < 10 ? "text-red-600 font-bold" : "text-gray-800 dark:text-gray-200"
                    }`}
                >
                  {product.stock}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-300">
                    Editar
                  </button>
                  <button className="ml-2 px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-300">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </div >
  );
}
