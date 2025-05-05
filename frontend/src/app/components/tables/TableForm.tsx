import React, { useState, useEffect } from 'react';
import { Table } from '../../types/table.types';

interface TableFormProps {
  tableToEdit: Table | null;
  onSave: (tableData: Omit<Table, 'id' | 'position' | 'pedidoId'>) => void;
  onCancel: () => void;
}

interface FormData {
  numero: string;
  capacidad: number;
  estado: 'disponible' | 'ocupada' | 'reservada';
  ubicacion: string;
}

interface FormErrors {
  numero?: string;
  capacidad?: string;
  estado?: string;
  ubicacion?: string;
}

const TableForm: React.FC<TableFormProps> = ({ tableToEdit, onSave, onCancel }) => {
  const initialState: FormData = {
    numero: '',
    capacidad: 4,
    estado: 'disponible',
    ubicacion: 'Área general',
  };

  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (tableToEdit) {
      setFormData({
        numero: tableToEdit.numero || '',
        capacidad: tableToEdit.capacidad || 4,
        estado: tableToEdit.estado || 'disponible',
        ubicacion: tableToEdit.ubicacion || 'Área general',
      });
    } else {
      setFormData(initialState);
    }
  }, [tableToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacidad' ? parseInt(value, 10) : value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.numero.trim()) {
      newErrors.numero = 'El número de mesa es requerido';
    }
    if (formData.capacidad < 1) {
      newErrors.capacidad = 'La capacidad debe ser mayor a 0';
    }
    if (!formData.estado) {
      newErrors.estado = 'El estado es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {tableToEdit ? 'Editar Mesa' : 'Nueva Mesa'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Número de Mesa
          </label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.numero ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.numero && (
            <p className="text-red-500 text-sm mt-1">{errors.numero}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Capacidad
          </label>
          <input
            type="number"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleInputChange}
            min="1"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.capacidad ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.capacidad && (
            <p className="text-red-500 text-sm mt-1">{errors.capacidad}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Ubicación
          </label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.ubicacion ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.ubicacion && (
            <p className="text-red-500 text-sm mt-1">{errors.ubicacion}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Estado
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.estado ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
            <option value="reservada">Reservada</option>
          </select>
          {errors.estado && (
            <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableForm;