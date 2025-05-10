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
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(); // 🔥 Se inicializa correctamente

  // 🚀 Cargar token y usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    //const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true); // Establece la autenticación como verdadera
    }
  }, []);

  // 🚀 Verifica autenticación cuando cambia el token
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      handleGetProfile(); // 🔥 Carga el usuario automáticamente si hay token
      startTokenValidationTimer(); // Inicia el temporizador para validar el token
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  // Función para verificar si el token ha expirado (si es un JWT)
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el JWT
      const expiry = payload.exp * 1000; // Expiración en milisegundos
      const currentTime = Date.now();
      return currentTime > expiry; // Si el tiempo actual es mayor que la expiración, el token ha expirado
    } catch (e) {
      console.error("Error al verificar el token:", e);
      return true; // Si hay un error, asumimos que el token ha expirado
    }
  };

  // Función para iniciar el temporizador que valida el token
  const startTokenValidationTimer = () => {
    const intervalId = setInterval(() => {
      if (token && isTokenExpired(token)) {
        handleLogout(); // Si el token ha expirado, cierra sesión
      }
    }, 5 * 60 * 1000); // Verifica cada 5 minutos (5000 ms)
    console.log("interval", intervalId);
    return intervalId;
  };
  {
    /*======================================================================== */
  }
  //login
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

  //register
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

  //logout
  const handleLogout = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      await authService.logout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setToken(null);
      setIsAuthenticated(false);
      clearInterval(tokenValidationInterval); // Limpia el temporizador cuando el usuario cierra sesión
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // get profile
  const handleGetProfile = async () => {
    if (!token) return; // 🔥 Evita llamadas innecesarias
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await authService.getProfile();
      if (response?.user) {
        setUser(response.user);
        console.log(user);
        //localStorage.setItem("user", JSON.stringify(response.user));
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
