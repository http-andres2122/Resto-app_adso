// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Verificar si hay un token en el localStorage

  if (!token) {
    // Si no hay token, redirigir a la página de login
    return <Navigate to="/" />;
  }

  return children; // Si hay un token, renderizar los componentes hijos (ruta protegida)
};

export default ProtectedRoute;
