import React, { useState, useEffect } from "react";
import * as productoService from "../../api/services/products/productoService"
import * as inventarioService from "../../api/services/products/inventarioService"
import AddProduct from "../../components/products/addProduct";

export default function Products() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para indicar si se están cargando los datos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchProductsAndStock = async () => {
      try {
        const [productData, stockData] = await Promise.all([
          productoService.getProductos(),
          inventarioService.getInventario(), // Llama a la API de stock
        ]);

        console.log("Datos de productos:", productData);
        console.log("Datos de stock:", stockData);

        if (Array.isArray(productData) && Array.isArray(stockData)) {
          // Combinar datos (asumiendo que hay un ID en común)
          const combinedProducts = productData.map((product) => {
            const stockInfo = stockData.find((stock) => stock.producto_id === product.id); // Ajusta 'producto_id' según tu API
            return {
              ...product,
              stock: stockInfo ? stockInfo.cantidad_actual : 'Stock no disponible', // Añade el stock al producto
            };
          });
          setProducts(combinedProducts);
        } else {
          console.error("Formato de datos incorrecto:");
          setError("Error: Formato de datos incorrecto desde las APIs.");
          setProducts([]);
        }
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("Hubo un error al cargar los productos.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndStock();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-4">No hay productos para mostrar.</div>;
  }


  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {/* Título */}
      < h2 className="text-3xl font-bold mb-6" > Gestión de Productos</h2 >

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
          <div className="mt-4"> {/* Agrega un margen superior */}
            <AddProduct onCancel={() => setShowAddProduct(false)} /> {/* Pasa la función onCancel */}
          </div>
        )}
      </div>

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
            {products && products.map((product) => (
              <tr key={product.id} className="border-t dark:border-gray-600">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{product.id}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{product.nombre}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{product.categoria_nombre}</td>
                <td className="px-6 py-4 text-right text-gray-800 dark:text-gray-200">
                  ${Number(product.precio).toFixed(2)}
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
