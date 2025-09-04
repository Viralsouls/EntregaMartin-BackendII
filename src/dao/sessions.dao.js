import userDAO from "./users.dao.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

class SessionsDAO {
  async register(userData) {
    const { email, password } = userData;

    // Verificamos si el usuario ya existe
    const existingUser = await userDAO.getByEmail(email);
    if (existingUser) throw new Error("El usuario ya existe");

    // Encriptamos la contraseña antes de guardar
    userData.password = createHash(password);
    const newUser = await userDAO.create(userData);
    return newUser;
  }

  async login(email, password) {
    const user = await userDAO.getByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    // Validamos contraseña
    const validPassword = isValidPassword(user, password);
    if (!validPassword) throw new Error("Contraseña incorrecta");

    // Generamos JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  }

  async logout() {
    // Con JWT no existe logout real, solo eliminamos cookie/token en cliente
    return { message: "Sesión cerrada correctamente" };
  }
}

export default new SessionsDAO();