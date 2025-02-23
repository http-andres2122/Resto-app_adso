import useDarkMode from "../hooks/UseDarkMode";

export default function NotFound() {
    useDarkMode(); // Hook para gestionar el modo oscuro

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-400">404</h1>
                <p className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Página no encontrada
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Lo sentimos, pero no pudimos encontrar la página que buscas.
                </p>
                <div className="mt-6">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium rounded-lg transition-colors duration-300"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        </div>
    );
}
