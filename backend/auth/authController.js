import verifyToken from "../utils/jwt.js"; // Importar la utilidad
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import usuario from "../models/usuarioModel.js";

// Inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }
  try {
    //verificar si el usuario ya existe y almacena informacion del usuario para el login
    const user = await usuario.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Generar token
    const token = generateToken(user);
    console.log("token auth controller:", token);
    console.log("user auth controller:", user);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role_id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//register user
const register = async (req, res) => {
  const { username, email, password, num_phone } = req.body;
  //validar datos
  if (!username || !email || !password || !num_phone) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }
  try {
    //verificar si el usuario ya existe
    const existingUser = await usuario.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Crear el usuario con datos básicos
    const newUserId = await usuario.createUser({
      username,
      email,
      num_phone,
      password, // La contraseña será hasheada dentro de createUser
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: newUserId,
        username,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando el usuario" });
  }
};

//get profile
const getProfile = async (req, res) => {
  try {
    // Obtener el token del encabezado
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Verificar el token
    const decoded = verifyToken(token);
    const userId = decoded.id;

    // Buscar al usuario en la base de datos
    const user = await usuario.getUserById(userId);
    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Enviar el perfil del usuario
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        num_phone: user.num_phone,
        role: user.role_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default { login, register, getProfile };
