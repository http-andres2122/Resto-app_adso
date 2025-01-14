import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import LoginError from '../pages/LoginError';

export default function AppRoutes() {
    return (
        
        <Routes>
            {/* Rutas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/login-error" element={<LoginError />} />
            <Route path="/" element={<Home />} /> {/* Ruta Home pública */}

            {/* Ruta Protegida: Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Ruta para manejo de errores (404) */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}