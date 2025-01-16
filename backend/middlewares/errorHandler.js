// Manejo global de errores
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  const statusCode = err.statusCode || 500; // Usa el código de estado si está definido, de lo contrario 500
  res.status(statusCode).json({
    success: false,
    message: err.message || "Ocurrió un error inesperado",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Devuelve el stack solo en desarrollo
  });
};

export default errorHandler;
