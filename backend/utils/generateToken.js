const jwt = require('jsonwebtoken');

// Función para generar un token JWT
const generateToken = (user) => {
    const secret = process.env.JWT_SECRET; // Clave secreta
    const expiresIn = process.env.JWT_EXPIRES;         // Tiempo de expiración

    // Generar el token con el payload del usuario
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        secret,  // Clave secreta para firmar el token
        { expiresIn }  // Configuración de expiración
    );

    return token;
};

module.exports = generateToken;