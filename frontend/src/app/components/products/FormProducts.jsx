import React, { useRef, useState, useEffect } from "react";
import { set } from "react-hook-form";
import DynamicForm from "../shared/DynamicForm";
import useProductStore from "../../store/ProductStore";
import CategorySelector from "./CategorySelector";

{ /* Campos del formulario de productos */ }
const fieldsProducto = [
  { name: "nombre", label: "Nombre", type: "text", required: true },
  { name: "descripcion", label: "Descripcion", type: "text", required: true },
  { name: "precio", label: "Precio", type: "number", required: true },
  { name: "stock", label: "Stock", type: "number", required: true },
];

function FormProducts() {
  { /* Store Zustand*/ }
  const { addProduct, editProduct } = useProductStore();
  const { setShowAddProduct, showAddProduct } = useProductStore();
  const { setShowEditProduct, showEditProduct, productToEdit, clearProductToEdit } = useProductStore();
  const formRef = useRef();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  { /*Efecto para precargar datos cuando hay un producto a editar*/ }
  useEffect(() => {
    if (productToEdit) {
      setSelectedCategoryId(productToEdit.categoria_id || ""); // Cargar categoría existente'
      setIsEditing(true); //Establecer isEditing a true si hay un producto para editar
    } else {
      setIsEditing(false); //Establecer isEditing a false si no hay un producto
    }
  }, [productToEdit]);

  { /* Función para enviar el formulario */ }
  const onSubmit = async (data) => {
    const productData = {
      ...data,
      categoria_id: selectedCategoryId,
    };

    try {
      if (isEditing) {
        // Si isEditing es true, se actualiza
        await editProduct(productToEdit.id, productData);
        console.log("Producto actualizado con éxito");
        setShowEditProduct(false); //cerrar el formulario de edición
        clearProductToEdit(); //limpiar el producto a editar
      } else {
        // Si no existe, se crea uno nuevo
        await addProduct(productData);
        console.log("Producto agregado con éxito");
        setShowAddProduct(false); //cerrar el formulario de agregar
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };
  { /* Función para cancelar la creación de un producto */ }
  const onCancel = () => {
    if (isEditing) {
      setShowEditProduct(false);
      clearProductToEdit();
    } else {
      setShowAddProduct(false);
    }
  };
  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategoryId(category);
  };
  // Función para enviar el formulario
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
        onSubmit={onSubmit}
        initialValues={productToEdit} // Se pasan valores iniciales si es edición
      />

      {/* Selector de categorías */}
      <CategorySelector
        selectCategory={handleCategoryChange} // Función para manejar el cambio de categoría
        initialSelectedCategoryId={selectedCategoryId}  // Categoría seleccionada inicialmente (si es edición)
      />

      {/* Botones */}
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={handleSubmitForm}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded"
        >
          {productToEdit ? "Actualizar Producto" : "+ Agregar Producto"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default FormProducts;
