import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormProducts from "./FormProducts";
import useProductStore from "../../store/ProductStore";
import * as productoService from "./services/productoService";

export default function EditProduct() {
  const { productId } = useParams(); // Obtener el ID del producto de la URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { products, fetchProducts, editProduct } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(); // Cargar productos si el array está vacío
    }
  }, [products, fetchProducts]);

  useEffect(() => {
    console.log("productId:", productId);
    console.log("products:", products);
    if (products.length > 0) {
      const productToEdit = products.find((p) => p.id === parseInt(productId)); // Buscar el producto por ID dentro de los objetos
      if (productToEdit) {
        setProduct(productToEdit);
        setLoading(false);
      } else {
        setError("Producto no encontrado en el estado local.");
        setLoading(false);
      }
    }
  }, [productId, products]);

  const handleSubmit = async (updatedProduct) => {
    try {
      await editProduct(productId, updatedProduct);
      setSuccessMessage("Producto actualizado con éxito");
      // Redirigir a la lista de productos después de una actualización exitosa
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 1500);
    } catch (err) {
      setError("Error al actualizar el producto");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/products");
  };

  if (loading) {
    return (
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-bold mb-6">Cargando producto...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-bold mb-6">Error</h2>
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Editar Producto #{productId}</h2>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}

      {/* Formulario */}
      <FormProducts
        initialProduct={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={true}
      />
    </div>
  );
}
