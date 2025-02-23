import React from 'react';

export default function LoginError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error al iniciar sesión</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">Las credenciales que has introducido son incorrectas. Por favor, inténtalo de nuevo.</p>
                <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Volver a intentar</a>
            </div>
        </div>
    );
}