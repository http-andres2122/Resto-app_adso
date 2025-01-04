const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { generateToken } = require("../utils/generateToken");

// Genera un token JWT
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user.id, username: user.username, role: user.role_id },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES }
//   );
// };

// Inicio de sesión
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [tb] = await db
      .promise()
      .query("SELECT * FROM usuarios WHERE username = ?", [username]);
    console.log(tb);
    if (tb.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = tb[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("row users:", user);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = generateToken(user);
    // res.json({ token, role: user.role_id });
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { login };
