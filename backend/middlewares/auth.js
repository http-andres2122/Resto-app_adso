import verifyToken from "../utils/jwt.js"; // Importar la utilidad

// Middleware de autenticación
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
    // Verifica el token usando la utilidad
    const decoded = verifyToken(token);
    req.user = decoded; // Agrega los datos decodificados al objeto `req`
    console.log("Auth decoded token:", decoded);
    next(); // Continúa al siguiente middleware
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message, // Mensaje desde la utilidad
    });
  }
};

export default auth;
