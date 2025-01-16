// components/ContentRenderer.jsx
import { lazy, Suspense } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { PERMISSIONS } from '../constants/permissions';
import AccessDenied from './AccessDenied';
import Loading from './Loading';

// Importaciones dinámicas de los componentes de las secciones
const Overview = lazy(() => import("../pages/Dashboard/Overview"));
const Products = lazy(() => import("../pages/Dashboard/Products"));
const Settings = lazy(() => import("../pages/Dashboard/Settings"));
const Orders = lazy(() => import("../pages/Dashboard/Orders"));
const Tables = lazy(() => import("../pages/Dashboard/Tables"));

// Objeto que mapea nombres de sección a componentes
const sectionComponents = {
    overview: Overview,
    products: Products,
    orders: Orders,
    tables: Tables,
    settings: Settings,
};

const ContentRenderer = ({ activeSection }) => { // Recibe la sección activa como prop
    const { hasPermission } = usePermissions(); // Obtiene la función hasPermission del hook

    const Component = sectionComponents[activeSection]; // Obtiene el componente correspondiente a la sección activa

    if (!Component) { // Si no se encuentra el componente (sección no válida)
        return <p>Sección no encontrada.</p>;
    }

    const permissionToCheck = { //Objeto que contiene los permisos que necesita cada seccion
        products: PERMISSIONS.PRODUCTOS.VER,
        orders: PERMISSIONS.ORDENES.VER,
        tables: PERMISSIONS.MESAS.VER,
        settings: PERMISSIONS.CONFIGURACION.VER,
        overview: null //Overview no necesita permisos
    }[activeSection] //Busca el permiso segun la seccion activa

    if (permissionToCheck && !hasPermission(permissionToCheck)) { //Si la seccion necesita un permiso y el usuario no lo tiene
        return <AccessDenied /> //Retorna el componente de acceso denegado
    }

    return (
        <Suspense fallback={<Loading />}> {/* Muestra el componente Loading mientras se carga el componente dinámico */}
            <Component /> {/* Renderiza el componente de la sección */}
        </Suspense>
    );
};

export default ContentRenderer;
