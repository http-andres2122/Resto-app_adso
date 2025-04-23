import React, { useRef, useState, useEffect } from "react";
import DynamicForm from "../shared/DynamicForm";
import CategorySelector from "./CategorySelector";
import useProductStore from "../../store/ProductStore";

// Campos del formulario de productos
const fieldsProducto = [
  { name: "nombre", label: "Nombre", type: "text", required: true },
  { name: "descripcion", label: "Descripcion", type: "text", required: true },
  { name: "precio", label: "Precio", type: "number", required: true },
  { name: "stock", label: "Stock", type: "number", required: true },
];

// El componente ahora recibe props para manejar submit, cancel, valores iniciales y modo de edición
function FormProducts({ onSubmit, onCancel, initialProduct, isEditing = false }) {
  const formRef = useRef();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  // Usar fetchCategories para cargar categorías al inicio
  const { fetchCategories } = useProductStore();

  // Efecto para precargar datos cuando hay un producto a editar
  useEffect(() => {
    // Cargar categorías al montar el componente
    fetchCategories();

    // Si hay un producto inicial (modo edición), establecer la categoría
    if (initialProduct && initialProduct.categoria_id) {
      setSelectedCategoryId(initialProduct.categoria_id);

      // Si existe el nombre de la categoría en el producto inicial, también lo guardamos
      if (initialProduct.categoria_nombre) {
        setSelectedCategoryName(initialProduct.categoria_nombre);
      }
    }
  }, []);

  // Función para enviar el formulario
  const handleFormSubmit = async (data) => {
    if (!selectedCategoryId) {
      alert("Por favor seleccione una categoría");
      return;
    }

    const productData = {
      ...data,
      categoria_nombre: selectedCategoryName, // Asignar el nombre de la categoría
      categoria_id: selectedCategoryId // Asignar el ID de la categoría
    };

    // Pasar los datos al manejador recibido por props
    onSubmit(productData);
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (id, name) => {
    console.log("Categoría seleccionada:", id, name);

    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
  };

  // Función para enviar el formulario manualmente
  const handleSubmitForm = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  return (
    <div className="p-6">
      {/* Formulario de productos */}
      <DynamicForm
        ref={formRef}
        fields={fieldsProducto}
        onSubmit={handleFormSubmit}
        initialValues={initialProduct} // Valores iniciales para edición
      />

      {/* Selector de categorías */}
      <CategorySelector
        selectCategory={handleCategoryChange}
        initialSelectedCategoryId={selectedCategoryId}
      />

      {/* Botones */}
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={handleSubmitForm}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          {isEditing ? "Actualizar Producto" : "Agregar Producto"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default FormProducts;
