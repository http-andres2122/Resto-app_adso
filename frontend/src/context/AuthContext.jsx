import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../api/services/auth/authService';

export const AuthContext = createContext({
    user: null,
    token: null,
    isLoading: false,
    isError: null,
    errorDetails: null, //estado para los detalles del error
    isAuthenticated: false,
    login: (email, password) => { },
    register: (data) => { },
    logout: () => { },
    getProfile: () => { },
});

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [errorDetails, setErrorDetails] = useState(null); // Inicializa errorDetails
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('authToken');
    })



    const handleLogin = async (email, password) => {
        setIsLoading(true);
        setIsError(null);
        setErrorDetails(null); // Limpia los detalles del error
        console.log("handleLogin llamado con:", { email, password }); // Log 1: Credenciales enviadas

        try {
            const response = await authService.login(email, password);
            console.log("Respuesta del backend:", response); // Log 2: Respuesta del backend

            if (response?.token && response?.user) {
                console.log("Token recibido:", response.token); // Log 3: Token recibido
                // setToken(() => response.token);
                localStorage.setItem('authToken', response.token); //guarda el token en el local storage
                //localStorage.setItem('user', JSON.stringify(response.user)); //guarda el user en el local storage
                await handleGetProfile(); // Llama a handleGetProfile DESPUÉS de guardar el token
                setIsAuthenticated(true);
                console.log("Token guardado en localStorage:", localStorage.getItem('authToken')); // Log 4: Token en localStorage
                console.log("estado del authverify:", isAuthenticated)
                console.log("Estado del token", token)
                console.log("Estado del user:", user)
            } else {
                console.log("Respuesta invalida del backend");
                throw new Error("Respuesta del servidor invalida")
            }
        } catch (error) {
            setIsError('Error al iniciar sesión'); // Mensaje genérico
            setUser(null); // Importante: Limpiar el usuario en caso de error
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
            if (error.response) {
                setErrorDetails(error.response.data); // Guarda los datos del error
                console.error("Detalles del error del servidor:", error.response.data);
            } else if (error.request) {
                console.error("No se recibió respuesta del servidor:", error.request);
                setErrorDetails({ message: "No se pudo conectar con el servidor." })
            } else {
                console.error("Error desconocido:", error);
                setErrorDetails({ message: "Ocurrió un error desconocido. Inténtalo nuevamente más tarde." })
            } messages
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (data) => {
        setIsLoading(true);
        setIsError(null);

        try {
            const response = await authService.register(data);
            console.log('Registration successful:', response); // Handle registration success
        } catch (error) {
            setIsError(error.message || 'Error during registration'); // Handle specific error messages
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        setIsError(null);

        try {
            await authService.logout();
            setUser(null);
            setToken(null);
            localStorage.removeItem('authToken');
        } catch (error) {
            setIsError(error.message || 'Error during logout'); // Handle specific error messages
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetProfile = async () => {
        setIsLoading(true);
        setIsError(null);

        try {
            const response = await authService.getProfile();
            // setUser(response.user); // Update user data if needed
            localStorage.setItem('user', JSON.stringify(response.user)); // Guarda el usuario como JSON
            console.log("usuario guardado en localStorage", localStorage.getItem("user"))
        } catch (error) {
            setIsError(error.message || 'Error fetching profile'); // Handle specific error messages
            setIsLoading(true);
            setIsError(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        if (storedToken) {
            setToken(storedToken);
            if (storedUser) {
                setUser(JSON.parse(storedUser)); // Parsea el usuario desde JSON
            }
            // handleGetProfile();
            console.log("useEffect set user:", user)
            console.log("useEffect set tokens:", token)
            console.log("useEffect check status authchecker:", isAuthenticated)
        }
    }, []); // Run only once on component mount

    return (
        <AuthContext.Provider value={{
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