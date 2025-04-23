import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Dashboard from '../../features/dashboard/pages/Dashboard';
import Login from '../../features/auth/pages/Login';
import LoginError from '../../features/auth/components/LoginError';
import ProtectedRoute from './ProtectedRoute';

// Importamos los componentes de las secciones del dashboard
import Overview from '../../features/dashboard/components/Overview';
import Products from '../../features/dashboard/components/Products';
import Orders from '../../features/dashboard/components/Orders';
import Tables from '../../features/dashboard/components/Tables';
import Settings from '../../features/dashboard/components/Settings';

// Importamos los componentes de acciones específicas
import AddProduct from '../../app/components/products/AddProduct';
import EditProduct from '../../app/components/products/EditProduct';
import AddOrder from '../../app/components/orders/AddOrder';
import EditOrder from '../../app/components/orders/EditOrder';
import OrderDetails from '../../app/components/orders/OrderDetails';

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rutas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/login-error" element={<LoginError />} />
            <Route path="/" element={<Home />} />

            {/* Rutas Protegidas: Dashboard con rutas anidadas */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {/* Subrutas del Dashboard */}
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />

                {/* Rutas de Productos */}
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/edit/:productId" element={<EditProduct />} />
                <Route path="products/:productId" element={<Products />} />

                {/* Rutas de Pedidos */}
                <Route path="orders" element={<Orders />} />
                <Route path="orders/add" element={<AddOrder />} />
                <Route path="orders/edit/:orderId" element={<EditOrder />} />
                <Route path="orders/details/:orderId" element={<OrderDetails />} />
                <Route path="orders/:orderId" element={<Orders />} />

                {/* Rutas de Mesas */}
                <Route path="tables" element={<Tables />} />
                <Route path="tables/add" element={<Tables />} />
                <Route path="tables/edit/:tableId" element={<Tables />} />
                <Route path="tables/:tableId" element={<Tables />} />

                {/* Rutas de Configuración */}
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* Ruta para manejo de errores (404) */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}