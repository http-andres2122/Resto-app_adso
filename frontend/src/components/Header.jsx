import React, { useState } from "react";
import useDarkMode from "../hooks/UseDarkMode";

export default function Header() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="flex justify-between items-center">
        {/* Título */}
        <div className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
          Panel de Control
        </div>

        {/* Menú de opciones para escritorio y móvil */}
        <div className="flex items-center space-x-4">
          {/* Botón de menú móvil */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Opciones de Escritorio */}
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">
              Hola, Administrador
            </span>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 text-sm bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            </button>
            <button className="px-4 py-2 text-sm bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="mt-4 sm:hidden bg-gray-50 dark:bg-gray-700 rounded shadow">
          <ul className="space-y-2">
            <li>
              <span className="block px-4 py-2 text-gray-800 dark:text-gray-200">
                Hola, Administrador
              </span>
            </li>
            <li>
              <button
                onClick={toggleDarkMode}
                className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
