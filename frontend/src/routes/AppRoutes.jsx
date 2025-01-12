// src/routes/AppRoutes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute'; // Importamos la ruta protegida

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Ruta pública: login */}
                <Route path="/" element={<Login />} />

                {/* Ruta protegida: dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Ruta pública: home (opcional)
        <Route path="/home" element={<Home />} /> */}

                {/* Ruta para manejo de errores */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
