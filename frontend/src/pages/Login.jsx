import React, { useState } from "react";
import useDarkMode from "../hooks/UseDarkMode"; // Importo el hook para el modo oscuro
import { useNavigate } from "react-router-dom"; // Importo useNavigate para la navegación
import { login } from "../api/services/auth/authService"; // Importo el servicio de login
import { createSearchParams } from "react-router-dom";

export default function Login() {
  useDarkMode(); // Activo el modo oscuro usando el hook
  const [email, setEmail] = useState(""); // Estado para el email, inicializado como string vacío
  const [password, setPassword] = useState(""); // Estado para la contraseña, inicializado como string vacío
  const [error, setError] = useState(""); // Estado para el mensaje de error, inicializado como string vacío
  const navigate = useNavigate(); // Hook para obtener la función de navegación

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevengo la recarga de la página al enviar el formulario
    setError(""); // Limpio el mensaje de error antes de cada intento de login

    try {
      // Intento realizar el login llamando al servicio
      const { token } = await login(email, password); // Llamo a la función login del servicio, que hace la petición al backend
      localStorage.setItem("authToken", token); // Guardo el token en el localStorage
      navigate("/dashboard"); // Redirijo al usuario al dashboard
    } catch (error) {
      console.error("Error en el login:", error);
      console.trace("Traza del error:");
      // Manejo de errores en caso de que la petición falle
      console.error("Error completo en el login:", error); // Imprimo el error completo en la consola para depuración

      let errorMessage = "Hubo un problema al iniciar sesión. Inténtalo de nuevo :)."; // Mensaje de error por defecto

      if (error.response) { // Verifico si hay una respuesta del servidor
        console.error("Respuesta del servidor:", error.response); // Imprimo la respuesta completa
        if (error.response.data) {
          console.error("Datos de la respuesta:", error.response.data); // Imprimo los datos de la respuesta
        }
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Obtengo el mensaje del backend si existe
        } else if (error.response.status === 401) {
          errorMessage = "Credenciales incorrectas."; // Mensaje específico para error 401
        } else if (error.response.status === 404) {
          errorMessage = "Usuario no encontrado."; // Mensaje específico para error 404
        } else if (error.response.status === 400) {
          errorMessage = "Petición incorrecta."; // Mensaje específico para 400
        }
        else {
          errorMessage = `Error del servidor: ${error.response.status} ${error.response.statusText}.`;//Mensaje mas especifico
        }
      } else if (error.request) { // Verifico si hubo un error de red (no se recibió respuesta)
        console.error("No se recibió respuesta del servidor:", error.request);
        errorMessage = "No se pudo conectar con el servidor.";
      } else { // Otros tipos de errores
        console.error("Error desconocido:", error);
        errorMessage = "Ocurrió un error desconocido. Inténtalo nuevamente más tarde.";
      }

      setError(errorMessage); // Establezco el mensaje de error en el estado, ¡ESTO ES CRUCIAL PARA MOSTRAR EL ERROR EN EL COMPONENTE!
      // Ya no uso navigate("/login-error")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      {/* Contenedor principal con estilos */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-8 max-w-sm w-full">
        {/* Contenedor del formulario con estilos */}
        <div className="text-center mb-6">
          {/* Título y subtítulo */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Bienvenido
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Inicia sesión para continuar
          </p>
        </div>

        {error && ( // Renderizado condicional del mensaje de error. Si 'error' tiene un valor (string no vacío), se muestra el div.
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {error} {/* Muestro el mensaje de error */}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Formulario de inicio de sesión */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email} // Vinculo el valor del input al estado 'email'
              onChange={(e) => setEmail(e.target.value)} // Actualizo el estado 'email' con el valor del input
              placeholder="Ingresa tu correo"
              className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password} // Vinculo el valor del input al estado 'password'
              onChange={(e) => setPassword(e.target.value)} // Actualizo el estado 'password' con el valor del input
              placeholder="Ingresa tu contraseña"
              className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit" // Tipo submit para que se envíe el formulario
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Separador "o" */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">o</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        {/* Enlace para registrarse */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}