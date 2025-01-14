import React, { useContext, useState, useEffect } from "react";
import useDarkMode from "../hooks/UseDarkMode"; // Importo el hook para el modo oscuro
import { AuthContext } from "../context/AuthContext"; //importarmos el contexto
import { useNavigate } from 'react-router-dom';

export default function Login() {
  useDarkMode(); // Activo el modo oscuro usando el hook
  const { login, isLoading, isError, errorDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Estado para el email, inicializado como string vacío
  const [password, setPassword] = useState(""); // Estado para la contraseña, inicializado como string vacío



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevengo la recarga de la página al enviar el formulario

    try {
      await login(email, password); // llama a la funcion login del contexto
      navigate('/dashboard')
    } catch (error) {
      console.error("Error en el login:", error);
      console.log(error);
    }
  };
  //redirect use effect 
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/dashboard'); // Redirección DESPUÉS de la actualización
  //   }
  // }, [localStorage.getItem('token')]); // El efecto se ejecuta cuando cambia el token en localStorage


  if (isLoading) {
    return <div className="text-center mt-4">Cargando...</div>; // Mensaje de carga centrado
  }

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

        {isError && ( // Renderizado condicional del mensaje de error. Si 'error' tiene un valor (string no vacío), se muestra el div.
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {isError} {/* Mensaje de error general */}
            {/*Manejo de distintos tipos de respuesta*/}
            {errorDetails && errorDetails.message && <p>{errorDetails.message}</p>}
            {errorDetails && errorDetails.error && <p>{errorDetails.error}</p>}
            {errorDetails && errorDetails.errors && Object.keys(errorDetails.errors).map(key => (<p key={key}>{key}: {errorDetails.errors[key]}</p>))}
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