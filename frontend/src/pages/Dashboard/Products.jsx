<<<<<<< Updated upstream
import React from "react";

export default function Products() {
  const products = [
    { id: 1, name: "Pizza Margarita", category: "Comida", price: 12.5, stock: 15 },
    { id: 2, name: "Coca-Cola 500ml", category: "Bebidas", price: 1.5, stock: 50 },
    { id: 3, name: "Hamburguesa Clásica", category: "Comida", price: 8.0, stock: 8 },
    { id: 4, name: "Ensalada César", category: "Comida", price: 5.0, stock: 12 },
    { id: 5, name: "Té Helado", category: "Bebidas", price: 2.0, stock: 25 },
  ];
=======
import React, { useState, useEffect } from "react";
import AddProduct from "../../components/products/AddProduct.jsx";
import EditProduct from "./../../components/products/editProduct";
import TableProducts from "./../../components/products/TableProducts.jsx";
import useProductStore from "../../store/ProductStore.jsx";

export default function Products() {
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para indicar si se están cargando los datos
  const [error, setError] = useState(null); // Estado para manejar errores

  const { showAddProduct, setShowAddProduct } = useProductStore(); // Correcto
  const { showEditProduct, setShowEditProduct } = useProductStore(); // Correcto

  console.log("showAddProduct product:", showAddProduct);

  // if (loading) {
  //   return <div className="text-center py-4">Cargando productos...</div>;
  // }

  // if (error) {
  //   return <div className="text-center text-red-500 py-4">{error}</div>;
  // }

  // if (!products || products.length === 0) {
  //   return (
  //     <div className="text-center py-4">No hay productos para mostrar.</div>
  //   );
  // }
>>>>>>> Stashed changes

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {/* pagina  */}
      <div>
        {/* Título */}
        <h2 className="text-3xl font-bold mb-6"> Gestión de Productos</h2>

<<<<<<< Updated upstream
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
=======
        {/* Botón para agregar producto */}
        <div className="mb-4">
          {!showAddProduct && ( // Muestra el botón solo si el formulario está oculto
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              onClick={() => setShowAddProduct(true)} // Muestra el formulario al hacer clic
            >
              + Agregar Producto
            </button>
          )}

          {showAddProduct && ( // Muestra el formulario solo si showAddProduct es true
            <div className="mt-4">
              {/* Agrega un margen superior */}
              <AddProduct />
            </div>
          )}
        </div>

        {/* Tabla de Productos */}
        <div>
          <TableProducts />
        </div>
      </div>

      {/*edit zone */}
      {showEditProduct && (
        <div>
          <EditProduct
            onCancel={() => setShowEditProduct()}
          />
        </div>
      )}
    </div>
>>>>>>> Stashed changes
  );
}
