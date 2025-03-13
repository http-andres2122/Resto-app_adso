import React, { useState, useEffect } from "react";
import FormProducts from "./FormProducts";

export default function editProduct({ product }) {
  // Inicializa el estado local con el producto recibido por prop
  const [updatedProduct, setUpdatedProduct] = useState(product);
  //loading
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  //categorias
  const [categorias, setCategorias] = useState([]);
  // const [categoriaId, setCategoriaId] = useState(
  //   updatedProduct.categoria_id || ""
  // );
  //error and success
  const [errorProducto, setErrorProducto] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  // if (loadingCategorias) {
  //     return <div>Cargando Producto...</div>;
  // }

  // if (errorCategorias) {
  //     return <div className="text-red-500">{errorCategorias}</div>;
  // }

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-6">Editar Producto </h2>

      {errorProducto && (
        <div className="text-red-500 mb-4">{errorProducto}</div>
      )}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      {/*Formulario*/}
      <FormProducts />
    </div>
  );
}
