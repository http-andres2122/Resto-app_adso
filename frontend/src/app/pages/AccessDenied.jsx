// components/AccessDenied.jsx
import React from 'react';

const AccessDenied = () => {
    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Acceso Denegado</h2>
            <p className="text-gray-600 dark:text-gray-400">No tienes permisos para acceder a esta sección.</p>
        </div>
    );
};

export default AccessDenied;
