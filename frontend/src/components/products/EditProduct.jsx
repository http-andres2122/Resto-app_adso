import React, { useState, useEffect } from "react";
import * as productoService from "../../api/services/products/productoService";
import * as inventarioService from "../../api/services/products/InventarioService";
import * as categoriaService from "../../api/services/products/categoriaService";
import CategorySelector from "./CategorySelector";

export default function editProduct({ onCancel, product }) {
  // Inicializa el estado local con el producto recibido por prop
  const [updatedProduct, setUpdatedProduct] = useState(product);
  //loading
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  //categorias
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState(
    updatedProduct.categoria_id || ""
  );
  //error and success
  const [errorProducto, setErrorProducto] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const categoriasData = await categoriaService.getCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      // setErrorCategorias("Error al cargar las categorías.");
    } finally {
      setLoadingCategorias(false);
    }
  };

  // Función para manejar los cambios en el campo de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "stock" ? parseInt(value, 10) : value;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: parsedValue,
    }));
  };
  //funcion para actualizar el producto a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { stock, categoria_nombre, ...productData } = updatedProduct;
    // Agregar la categoría seleccionada al objeto productData
    productData.categoria_id = categoriaId;
    try {
      console.log("producto editado:", productData);
      const response = await productoService.updateProducto(productData);
      if (!response.id) {
        throw new Error("No se recibió el ID del producto creado.");
      }
      //Preparar los datos para la API de stock
      const productoId = response.id;
      console.log("producto id:", productoId);
      setSuccessMessage("Producto editado con éxito!");
      const stockData = {
        producto_id: productoId,
        cantidad_actual: stock,
      };
      //Llamar a la API de stock
      try {
        console.log("Enviando stockData:", stockData);
        await inventarioService.updateInventario(stockData);
        setSuccessMessage("Producto y stock editado con éxito!");
      } catch (stockError) {
        console.error("Error al actualizar el stock:", stockError);
      }
    } catch (error) {
      console.error("Error al editar producto:", error);
      setErrorProducto(
        "Error al editar el producto. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleAddCategory = async (nombre) => {
    try {
      console.log("addProduct:", nombre);
      // Lógica para guardar la nueva categoría en la API
      await categoriaService.createCategoria({ nombre: nombre });
      // Recargar las categorías después de agregar una nueva
      fetchCategorias();
      // setNewCategoryName("");
      // setShowAddCategoryModal(false);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      // Manejar el error
    }
  };

  // Función para manejar la eliminación de una categoría
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar esta categoría?")) {
      return;
    }

    // setLoading(true); // Mostrar indicador de carga
    try {
      const response = await categoriaService.deleteCategoria(id);
      console.log("response:", response.message);
      //SetCategoriaId(vacio)
      setCategoriaId("");
      // Recargar las categorías después de agregar una nueva
      fetchCategorias();
      alert("Categoría eliminada con éxito");
      // showSuccessMessage("Categoría eliminada con éxito"); // Notificación más elegante
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      alert("Categoría NO eliminada con éxito");
      // showErrorMessage("Error al eliminar la categoría. Inténtelo nuevamente."); // Notificación más elegante
    } //finally {
    //     setLoading(false); // Ocultar indicador de carga
    // }
  };

  // if (loadingCategorias) {
  //     return <div>Cargando Producto...</div>;
  // }

  // if (errorCategorias) {
  //     return <div className="text-red-500">{errorCategorias}</div>;
  // }

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Editar Producto
        </h2>

        {errorProducto && (
          <div className="text-red-500 mb-4">{errorProducto}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        {/*Formulario*/}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Producto ID:
              </label>
              <input
                type="text"
                value={updatedProduct.id}
                name="id"
                readOnly
                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Nombre:
              </label>
              <input
                type="text"
                value={updatedProduct.nombre}
                name="nombre"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Descripcion:
              </label>
              <input
                type="text"
                value={updatedProduct.descripcion}
                name="descripcion"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Precio:
              </label>
              <input
                type="number"
                value={updatedProduct.precio}
                name="precio"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Stock:
              </label>
              <input
                type="number"
                value={updatedProduct.stock}
                name="stock"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
              />
            </div>

            {/* Categoría */}
            <CategorySelector
              categorias={categorias} //envia categorias
              categoriaId={categoriaId} //envia categoria id
              setCategoriaId={setCategoriaId} //setcategoria
              onDeleteCategory={handleDeleteCategory} // delete categoria
              onAddCategory={handleAddCategory} //add categoria
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-300">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
