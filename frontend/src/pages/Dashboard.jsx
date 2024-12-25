import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Overview from "./Overview";
import Products from "./Products";
import Settings from "./Settings";
import Orders from "./Orders";
import Tables from "./Tables";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la apertura del sidebar en móvil

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "tables":
        return <Tables />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <Sidebar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        isOpen={isSidebarOpen} // Pasamos el estado para el sidebar
        setIsSidebarOpen={setIsSidebarOpen} // Pasamos la función para controlar el sidebar
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
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
