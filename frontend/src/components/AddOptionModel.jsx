// AddOptionModal.js
import React, { useState } from "react";

const AddOptionModal = ({ isOpen, onClose, onSave, label }) => {
  const [newOptionName, setNewOptionName] = useState("");

  const handleSave = () => {
    if (newOptionName.trim()) {
      onSave(newOptionName);
      console.log("newOptionName:", newOptionName);
      setNewOptionName("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-gray-700 p-5 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Agregar Nueva Opción</h3>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-300"
          value={newOptionName}
          onChange={(e) => setNewOptionName(e.target.value)}
          placeholder={`Nombre de ${label}`}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300">
            Guardar
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOptionModal;
