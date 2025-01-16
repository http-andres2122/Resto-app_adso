// utils/jwt.js
import jwt from 'jsonwebtoken';

/**
 * Verifica un token JWT y devuelve los datos decodificados.
 * @param {string} token - El token JWT a verificar.
 * @returns {object} - Los datos decodificados del token.
 * @throws {Error} - Si el token es inválido o expirado.
 */
const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token no proporcionado');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("jwt decoded util:", decoded)
    return decoded; // Devuelve el contenido decodificado (por ejemplo, el userId)
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

export default verifyToken;
