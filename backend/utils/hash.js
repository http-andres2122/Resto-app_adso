const bcrypt = require("bcrypt");

/**
 * Función para generar una contraseña hasheada
 * @param {string} plainPassword - La contraseña en texto plano
 * @returns {Promise<string>} - La contraseña hasheada
 */
const hashPassword = async (plainPassword) => {
  const saltRounds = 10; // Define la complejidad del hash
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

module.exports = { hashPassword };
