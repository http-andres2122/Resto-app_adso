import React, { useState } from "react";

export default function Settings() {
    const [restaurantName, setRestaurantName] = useState("Mi Restaurante");
    const [phone, setPhone] = useState("123-456-789");
    const [address, setAddress] = useState("Calle Ficticia 123");
    const [theme, setTheme] = useState("Claro");
    const [language, setLanguage] = useState("Español");

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {/* Título */}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Ajustes del Restaurante</h2>

            {/* Configuración General */}
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Configuración General</h3>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400">Nombre del Restaurante</label>
                        <input
                            type="text"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400">Teléfono</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400">Dirección</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                </div>
            </div>

            {/* Tema y Idioma */}
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Tema y Configuración de Idioma</h3>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400">Tema</label>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="Claro">Claro</option>
                            <option value="Oscuro">Oscuro</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400">Idioma</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="Español">Español</option>
                            <option value="Inglés">Inglés</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Botón de Guardar */}
            <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
}
