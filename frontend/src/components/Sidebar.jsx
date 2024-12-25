import React, { useState } from "react";

export default function Sidebar({ setActiveSection, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Resumen" },
    { id: "products", label: "Productos" },
    { id: "orders", label: "Pedidos" },
    { id: "tables", label: "Mesas" },
    { id: "settings", label: "Ajustes" },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className={`w-64 h-full flex flex-col bg-blue-600 text-white dark:bg-gray-800`}>
      {/* Barra superior en dispositivos móviles */}
      <div className="flex justify-between items-center p-4 sm:hidden">
        <div className="text-xl font-bold">Restaurant App</div>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
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
      </div>

      {/* Menú para dispositivos grandes */}
      <div className="hidden sm:flex flex-col">
        <div className="p-4 text-2xl font-bold">Restaurant App</div>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`p-4 cursor-pointer hover:bg-blue-700 dark:hover:bg-gray-700 ${
                activeSection === item.id ? "bg-blue-800" : ""
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 dark:bg-gray-900 flex flex-col">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`p-4 cursor-pointer hover:bg-blue-700 dark:hover:bg-gray-700 ${
                  activeSection === item.id ? "bg-blue-800" : ""
                }`}
                onClick={() => {
                  setActiveSection(item.id);
                  setMenuOpen(false); // Cierra el menú después de seleccionar una opción
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
