import React, { createContext, useState, useEffect } from "react";
import * as authService from "../api/services/auth/authService";

export const AuthContext = createContext({
  user: null,
  token: null,
  isLoading: false,
  isError: null,
  errorDetails: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  getProfile: async () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // 🔥 Se inicializa correctamente

  // 🚀 Verifica autenticación cuando cambia el token
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      handleGetProfile(); // 🔥 Carga el usuario automáticamente si hay token
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setIsError(null);
    setErrorDetails(null);

    try {
      const response = await authService.login(email, password);
      if (response?.token) {
        localStorage.setItem("authToken", response.token);
        setToken(response.token); // 🔥 Esto dispara el useEffect y carga el perfil
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    setIsError(null);

    try {
      await authService.register(data);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      await authService.logout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setToken(null);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetProfile = async () => {
    if (!token) return; // 🔥 Evita llamadas innecesarias
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await authService.getProfile();
      if (response?.user) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
      } else {
        throw new Error("No se pudo obtener el perfil del usuario.");
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 📌 Manejo centralizado de errores
  const handleAuthError = (error) => {
    setIsError("Error en la autenticación");
    if (error.response) {
      setErrorDetails(error.response.data);
    } else if (error.request) {
      setErrorDetails({ message: "No se pudo conectar con el servidor." });
    } else {
      setErrorDetails({ message: "Ocurrió un error desconocido." });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        isError,
        errorDetails,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        getProfile: handleGetProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
