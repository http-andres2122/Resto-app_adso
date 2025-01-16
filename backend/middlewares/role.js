import db from "../config/db.js"; // Conexión a la base de datos

const roleMiddleware =
  (...requiredRoles) =>
  async (req, res, next) => {
    console.log("Rol requerido:", requiredRoles);
    console.log("Rol del usuario:", req.user?.role);

    try {
      const user = req.user?.role; // `req.user` se llena al decodificar el token JWT
      const userId = req.user.id; // `req.user` se llena al decodificar el token JWT
      const [user_role] = await db
        .promise()
        .query(
          "SELECT r.name FROM usuarios u JOIN roles r ON u.role_id = r.id WHERE u.id = ?",
          [userId]
        );
      console.log("Rol del usuario:", user_role);

      //verificar si el rol del usuario existe
      if (!user_role) {
        return res.status(403).json({ error: "Usuario no autorizado." });
      }

      // Verificamos si el usuario tiene un rol válido
      if (!requiredRoles.includes(user)) {
        return res.status(403).json({ error: "Permiso denegado." });
      }

      // Definimos los permisos para cada rol
      const permissions = {
        1: ["GET", "POST", "PUT", "DELETE"], // Admin
        2: ["GET", "POST"], // Usuario regular
        // Agrega más roles y permisos según sea necesario
      };

      // Verificamos si el método de la solicitud está permitido para el rol del usuario
      const userRole = user; // Asumimos que `user` es el rol del usuario, por ejemplo, 2
      const allowedMethods = permissions[user]; // Obtenemos los métodos permitidos para el rol del usuario

      if (!allowedMethods || !allowedMethods.includes(req.method)) {
        return res
          .status(403)
          .json({ error: `Permiso denegado para acceder a ${req.method}` });
      }

      // Si el usuario tiene el rol requerido Y ESTA AUTORIZADO, continuamos con la solicitud
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error del servidor." });
    }
  };

export default roleMiddleware;
