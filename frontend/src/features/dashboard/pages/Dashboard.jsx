import { useState } from "react";
import Sidebar from "../../../app/components/navigation/Sidebar";
import Header from "../../../app/components/navigation/Header";
import ContentRenderer from '../../../app/components/shared/ContentRenderer'; // Importa el nuevo componente

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <Sidebar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <ContentRenderer activeSection={activeSection} /> {/* Usa el nuevo componente */}
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
