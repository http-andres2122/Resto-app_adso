import React, { useState, useEffect } from "react";
import useProductStore from "../../store/ProductStore";
import DynamicSelector from "../DynamicSelector";
import AddOptionModal from "../AddOptionModel";

function CategorySelector() {
  const { categories, fetchCategories, addCategory, deleteCategory } =
    useProductStore();
  const [selectedValue, setSelectedValue] = useState(""); // Valor seleccionado, solo la id
  const [showAddOptionModal, setShowAddOptionModal] = useState(false); // Mostrar modal

  // Cargar las categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories();
    };
    loadCategories();
  }, []);

  const handleSelectChange = (value) => {
    const numericValue = parseInt(value, 10); // Convertir a número entero
    console.log("Nueva categoría seleccionada:", numericValue);
    setSelectedValue(numericValue);
  };
  console.log("category1:", selectedValue);

  const handleAddOption = async (name) => {
    if (
      categories.some((cat) => cat.nombre.toLowerCase() === name.toLowerCase())
    ) {
      alert("Esta categoría ya existe.");
      return;
    }
    const newCategory = { nombre: name };
    const addedCategory = await addCategory(newCategory); // Devolver la categoría agregada
    if (addedCategory && addedCategory.id) {
      setSelectedValue(addedCategory.id);
      // Seleccionar automáticamente la nueva categoría
    }
    setShowAddOptionModal(false);
  };

  const handleDeleteOption = async () => {
    if (!selectedValue) return;

    const userConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (userConfirmed) {
      await deleteCategory(selectedValue); // Eliminar la categoría seleccionada
      fetchCategories(); // Recargar las categorías después de eliminar
      //setSelectedValue(""); // Limpiar la selección
    } else {
      alert("No se ha eliminado la categoría.");
    }
  };

  return (
    <div>
      {/* Selector de categorías */}
      <DynamicSelector
        options={categories.map((cat) => ({ id: cat.id, name: cat.nombre }))}
        selectedValue={selectedValue}
        onChange={handleSelectChange} // Solo actualiza el id
        label="Categoría"
        placeholder="Seleccione una categoría"
      />

      {/* Botones para agregar o eliminar */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setShowAddOptionModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          + Agregar Categoría
        </button>

        <button
          onClick={handleDeleteOption}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={!selectedValue}>
          X Eliminar
        </button>
      </div>

      {/* Modal para agregar nueva opción */}
      <AddOptionModal
        isOpen={showAddOptionModal}
        onClose={() => setShowAddOptionModal(false)}
        onSave={handleAddOption}
        label="Categoría"
      />
    </div>
  );
}

export default CategorySelector;
