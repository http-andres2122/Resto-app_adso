import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Espera un ciclo de renderizado para evitar redirecciones incorrectas
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 500); // Pequeño retraso para asegurar que el estado es el correcto

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || checkingAuth) {
    return <div className="text-center mt-4">Cargando...</div>; // Mensaje de carga mientras verifica
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
