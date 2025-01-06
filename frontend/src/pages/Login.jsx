import React, { useState } from "react";
import useDarkMode from "../hooks/UseDarkMode"; // Hook para el modo oscuro
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import axios from "axios"; // Importamos axios

export default function Login() {
  useDarkMode(); // Activamos el modo oscuro utilizando el hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Manejo de errores
  const navigate = useNavigate(); // Hook para navegación

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario

    try {
      // Realizar la solicitud al back-end usando axios
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;

      // Guardar token en localStorage
      localStorage.setItem("authToken", token); 

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      // Manejo de errores
      if (err.response) {
        // Si el error viene del servidor (por ejemplo, credenciales incorrectas)
        setError(err.response.data.message || "Credenciales inválidas");
      } else {
        // Si hay un error de red u otro problema
        setError("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-8 max-w-sm w-full">
        {/* Logo o título */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Bienvenido
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Mostrar error */}
        {error && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-900"
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-900"
            />
          </div>

          {/* Botón de Inicio de Sesión */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Separador */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">o</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        {/* Opción de Registro */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
