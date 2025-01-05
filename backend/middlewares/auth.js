const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Obtén el encabezado de autorización
  const authHeader = req.headers.authorization;

  // Verifica si el encabezado existe
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "NO TIENES AUTORIZACION",
    });
  }

  // Extrae el token
  const token = authHeader.split(" ")[1];

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega los datos decodificados al objeto `req`
    next(); // Continúa al siguiente middleware
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

module.exports = auth;
