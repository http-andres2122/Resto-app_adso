// controllers/userController.js
import usuario from "../../models/users/usuarioModel.js";

const usuarioController = {
  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await usuario.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching users" });
    }
  },

  // Obtener un usuario por ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await usuario.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching user" });
    }
  },

  // Crear un nuevo usuario
  createUser: async (req, res) => {
    const {
      username,
      email,
      password_hash,
      first_name,
      last_name,
      num_doc,
      tpe_doc,
      num_phone,
    } = req.body;
    try {
      const newUserId = await usuario.createUser({
        username,
        email,
        password_hash,
        first_name,
        last_name,
        num_doc,
        tpe_doc,
        num_phone,
      });
      res.status(201).json({ id: newUserId, username });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating user" });
    }
  },

  // Actualizar un usuario
  updateUser: async (req, res) => {
    const { id } = req.params;
    const {
      username,
      email,
      password_hash,
      first_name,
      last_name,
      num_doc,
      tpe_doc,
      num_phone,
    } = req.body;
    try {
      const affectedRows = await usuario.updateUser(id, {
        username,
        email,
        password_hash,
        first_name,
        last_name,
        num_doc,
        tpe_doc,
        num_phone,
      });
      if (affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating user" });
    }
  },

  // Eliminar un usuario
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await usuario.deleteUser(id);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting user" });
    }
  },

  //update password
  updatePassword: async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;
    if (!id || !newPassword) {
      return res.status(400).json({ error: "Missing required information" });
    }
    try {
      const affectedRows = await usuario.updatePassword(id, newPassword);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "Password updated successfully :)" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating password" });
    }
  },
};
export default usuarioController;
