import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext); // Usamos isAuthenticated
    console.log("protected route: estado del verifyAuth:", isAuthenticated)

    if (!isAuthenticated) { // Comprobamos isAuthenticated directamente
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;