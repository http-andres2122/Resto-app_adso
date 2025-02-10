import React, { useRef } from "react";
import DynamicForm from "../DynamicForm";
import CategorySelector from "./CategorySelector";
import useProductStore from "../../store/ProductStore.jsx";

const fieldsProducto = [
  { name: "nombre", label: "Nombre", type: "text", required: true },
  { name: "descripcion", label: "Descripcion", type: "text", required: true },
  { name: "precio", label: "Precio", type: "number", required: true },
  { name: "stock", label: "Stock", type: "number", required: true },
];

function FormProducts() {
  const { setShowAddProduct } = useProductStore();
  const formRef = useRef();

  const onSubmit = (data) => {
    console.log("Producto agregado:", data);
    setShowAddProduct(false); // Ocultar el formulario después de agregar el producto
  };

  const onCancel = () => {
    setShowAddProduct(false);
    console.log("Formulario cancelado");
  };

  const handleAddProduct = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <div className="p-6">
      {/* Formulario de productos */}
      <DynamicForm ref={formRef} fields={fieldsProducto} onSubmit={onSubmit} />

      {/* Selector de categorías */}
      <CategorySelector />

      {/* Botones */}
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={handleAddProduct}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded">
          + Agregar Producto
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default FormProducts;
