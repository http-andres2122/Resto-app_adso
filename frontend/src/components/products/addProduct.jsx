import React, { useState, useEffect } from "react";
import FormProducts from "./formProducts";

const AddProduct = () => {
  // Recibe la prop onCancel
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [errorCategorias, setErrorCategorias] = useState(null);
  const [errorProducto, setErrorProducto] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // if (loadingCategorias) {
  //   return <div>Cargando categorías...</div>;
  // }

  // if (errorCategorias) {
  //   return <div className="text-red-500">{errorCategorias}</div>;
  // }

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-6">Agregar Producto</h2>

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
};

export default AddProduct;