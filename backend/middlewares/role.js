const role = (requiredRole) => {
    return (req, res, next) => {
      console.log("Rol requerido:", requiredRole);
      console.log("Rol del usuario:", req.user?.role);
  
      const userRole = req.user?.role;
  
      if (!userRole || userRole !== requiredRole) {
        console.log("Permiso denegado");
        return res.status(403).json({
          error: "No tienes permiso para realizar esta acción",
        });
      }
  
      console.log("Permiso concedido");
      next();
    };
  };

    module.exports = role;