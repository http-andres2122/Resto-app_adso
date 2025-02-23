import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);
  // Verifica si el usuario está autenticado
  useEffect(() => {
    // Espera un ciclo de renderizado para evitar redirecciones incorrectas
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 500); // Pequeño retraso para asegurar que el estado es el correcto
    // Limpia el temporizador
    return () => clearTimeout(timer);
  }, []);
  // Si está cargando o verificando la autenticación, muestra un mensaje de carga
  if (isLoading || checkingAuth) {
    return <div className="text-center mt-4">Cargando...</div>; // Mensaje de carga mientras verifica
  }
  console.log(!isAuthenticated);
  // Si no está autenticado, redirige a la página de inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Si está autenticado, muestra el contenido de la ruta protegida
  return children;
};

export default ProtectedRoute;
