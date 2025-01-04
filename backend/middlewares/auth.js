const jwt = require("jsonwebtoken");

// Middleware para verificar autenticación
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // El token debe venir en el header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con la clave secreta
    req.user = decoded; // Almacena los datos del usuario en la solicitud
    next(); // Continúa con la siguiente función
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado." });
  }
};

module.exports = verifyToken;
