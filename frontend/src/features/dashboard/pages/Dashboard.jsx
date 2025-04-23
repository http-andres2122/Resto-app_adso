import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../../app/components/navigation/Sidebar";
import Header from "../../../app/components/navigation/Header";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Extraer la sección activa de la URL
  const getActiveSection = () => {
    const path = location.pathname.split('/');
    return path.length > 2 ? path[2] : 'overview';
  };

  return (
    <div className="flex h-screen min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <Sidebar
        activeSection={getActiveSection()}
        isOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Usa Outlet en lugar de ContentRenderer */}
        </div>
      </div>

      {/* Botón de abrir sidebar en móvil */}
      <button
        className="lg:hidden fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg dark:bg-blue-700 hover:bg-blue-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );
}
