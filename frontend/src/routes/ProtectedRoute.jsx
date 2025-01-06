import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("authToken"); // Verificamos si existe el token en localStorage

    if (!token) {
        // Si no hay token, redirigimos al login
        return <Navigate to="/" />;
    }

    // Si hay token, permitimos que el contenido de la ruta se renderice
    return children;
};

export default ProtectedRoute;
