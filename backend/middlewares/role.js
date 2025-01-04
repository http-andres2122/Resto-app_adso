const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.usuario.role_id; 

        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Acceso denegado: Rol insuficiente' });
        }

        next();
    };
};