import React, { useRef, useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState(""); // Guardar la categoría seleccionada

  const onSubmit = (data) => {
    // Asegurarse de agregar la categoría como número al objeto de datos
    const productData = { ...data, category: selectedCategory };
    console.log("Producto agregado:", productData);
    setShowAddProduct(false); // Ocultar el formulario después de agregar el producto
  };

  const onCancel = () => {
    setShowAddProduct(false);
    console.log("Formulario cancelado");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Actualizar la categoría seleccionada (número)
    console.log("Categoría seleccionada:", category);
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
      <CategorySelector
        selectedCategory={selectedCategory} // Número de la categoría seleccionada
        onCategoryChange={handleCategoryChange} // Actualizar la categoría con número
      />

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
