import React from 'react';

const Tables = () => {
  const mesas = [
    { numero: '1', capacidad: 4, estado: 'disponible' },
    { numero: '2', capacidad: 2, estado: 'ocupada' },
    { numero: '3', capacidad: 6, estado: 'reservada' },
    { numero: '4', capacidad: 4, estado: 'disponible' },
  ];

  const getStatusClass = (estado) => {
    switch (estado) {
      case 'disponible':
        return 'text-green-500 font-semibold';
      case 'ocupada':
        return 'text-red-500 font-semibold';
      case 'reservada':
        return 'text-yellow-500 font-semibold';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
      {/* Título */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Gestión de Mesas</h2>

      {/* Tabla de Mesas */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold dark:text-gray-200">Número</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold dark:text-gray-200">Capacidad</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold dark:text-gray-200">Estado</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold dark:text-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa, index) => (
              <tr key={index} className="border-t dark:border-gray-600">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{mesa.numero}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{mesa.capacidad} personas</td>
                <td className={`px-6 py-4 text-center ${getStatusClass(mesa.estado)} dark:text-gray-200`}>
                  {mesa.estado}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                    Editar
                  </button>
                  <button className="ml-2 px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
