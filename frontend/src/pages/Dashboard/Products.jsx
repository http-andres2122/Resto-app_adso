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
  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {/* pagina  */}
      <div>
        {/* Título */}
        <h2 className="text-3xl font-bold mb-6"> Gestión de Productos</h2>
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
          <EditProduct onCancel={() => setShowEditProduct()} />
        </div>
      )}
    </div>
  );
}
