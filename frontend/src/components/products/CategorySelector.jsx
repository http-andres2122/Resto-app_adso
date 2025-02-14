import React, { useState, useEffect } from "react";
import useProductStore from "../../store/ProductStore";
import DynamicSelector from "../DynamicSelector";
import AddOptionModal from "../AddOptionModel";

function CategorySelector({ selectCategory }) {
  const { categories, fetchCategories, addCategory, deleteCategory } =
    useProductStore();
  const [showAddOptionModal, setShowAddOptionModal] = useState(false); // Mostrar modal
  const [selectedCategory, setSelectedCategory] = useState(""); // Guardar la categoría seleccionada

  // Cargar las categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories();
    };
    loadCategories();
  }, []);

  const handleSelectChange = (value) => {
    const numericValue = parseInt(value, 10); // Aseguramos que el valor sea un número
    console.log("Nueva categoría seleccionada:", numericValue);
    setSelectedCategory(numericValue); // guardamos el id de la categoría seleccionada
    selectCategory(numericValue); // Pasamos el id de la categoría al componente padre
  };

  const handleAddOption = async (name) => {
    if (
      categories.some((cat) => cat.nombre.toLowerCase() === name.toLowerCase())
    ) {
      alert("Esta categoría ya existe.");
      return;
    }
    const newCategory = { nombre: name };
    const addedCategory = await addCategory(newCategory);
    if (addedCategory && addedCategory.id) {
      onCategoryChange(addedCategory.id); // Seleccionamos la nueva categoría automáticamente
    }
    setShowAddOptionModal(false);
  };

  const handleDeleteOption = async () => {
    if (!selectedCategory) return;

    const userConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (userConfirmed) {
      await deleteCategory(selectedCategory);
      fetchCategories(); // Recargamos las categorías después de eliminar
    } else {
      alert("No se ha eliminado la categoría.");
    }
  };

  return (
    <div>
      {/* Selector de categorías */}
      <DynamicSelector
        options={categories.map((cat) => ({ id: cat.id, name: cat.nombre }))} // Solo se necesita id y nombre
        selectedValue={selectedCategory} // Solo se necesita el id
        onChange={handleSelectChange} // Solo actualiza el id
        label="Categoría" // Etiqueta del selector
        placeholder="Seleccione una categoría" // Texto por defecto
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
          disabled={!selectedCategory}>
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
