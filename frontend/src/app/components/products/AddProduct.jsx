import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormProducts from "./FormProducts.jsx";
import useProductStore from "../../store/ProductStore";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();

  const [errorProducto, setErrorProducto] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (productData) => {
    try {
      await addProduct(productData);
      setSuccessMessage("Producto agregado con éxito");
      // Redirigir después de un breve retraso para mostrar el mensaje
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 1500);
    } catch (error) {
      setErrorProducto("Error al agregar el producto: " + error.message);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/products", { replace: true }); // Ensure proper unmounting
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Agregar Producto</h2>
      </div>

      {errorProducto && (
        <div className="text-red-500 mb-4">{errorProducto}</div>
      )}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}

      {/* Formulario */}
      <FormProducts
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />
    </div>
  );
};

export default AddProduct;
