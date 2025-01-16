import React, { useState, useEffect } from "react";
import MenuItems from "./MenuItems";

export default function Sidebar({ setActiveSection, activeSection, isOpen, setIsSidebarOpen }) {
  const [menuOpen, setMenuOpen] = useState(isOpen);

  useEffect(() => {
    setMenuOpen(isOpen);
  }, [isOpen]);

  const toggleMenu = () => setIsSidebarOpen(!isOpen);

  return (
    <div className={`w-64 h-full flex flex-col bg-blue-600 text-white dark:bg-gray-800 lg:flex ${isOpen ? 'block' : 'hidden'}`}>
      {/* Título y botón del menú móvil (visible solo en pantallas pequeñas) */}
      <div className="flex justify-between items-center p-4 lg:hidden">
        <div className="text-xl font-bold">Restaurant App</div> {/* Título en móvil */}
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Título y Menú (unificados para móvil y escritorio) */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-4 text-2xl font-bold hidden lg:block">Restaurant App</div> {/* Título en escritorio */}
        <ul>
          <MenuItems
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setMenuOpen={setIsSidebarOpen}
          />
        </ul>
      </div>
    </div>
  );
}