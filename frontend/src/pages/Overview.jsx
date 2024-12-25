import React from "react";

export default function Overview() {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      {/* Título */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Resumen del Restaurante</h2>

      {/* Primer Fila: Ventas, Pedidos Pendientes, Mesas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Ventas Totales del Día</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">$500.00</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Pedidos Pendientes</h3>
          <p className="text-xl font-bold text-yellow-500">8 Pedidos</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Mesas Disponibles</h3>
          <p className="text-xl font-bold text-green-500">5 Mesas</p>
        </div>
      </div>

      {/* Segunda Fila: Gráficos y Productos Más Vendidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Gráfico de Ventas</h3>
          {/* Aquí puedes incluir un componente de gráfico, por ejemplo, con Chart.js o cualquier librería que prefieras */}
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Productos Más Vendidos</h3>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Pizza Margherita - 30 Ventas</li>
            <li>Ensalada César - 20 Ventas</li>
            <li>Bebida Coca-Cola - 50 Ventas</li>
          </ul>
        </div>
      </div>

      {/* Tercera Fila: Pedidos Recientes */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Pedidos Recientes</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">ID Pedido</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Cliente</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Estado</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí los pedidos se renderizarán dinámicamente */}
            <tr>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">101</td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">Juan Pérez</td>
              <td className="px-6 py-4 text-yellow-500">Pendiente</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">102</td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">Ana Gómez</td>
              <td className="px-6 py-4 text-blue-500">Preparando</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
