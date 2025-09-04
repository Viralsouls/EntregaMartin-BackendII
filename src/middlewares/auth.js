import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    // token desde cookie o header
    const token =
      (req.cookies && req.cookies.token) ||
      (req.headers && req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "No autorizado, token faltante" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: "error", message: "Token inválido o expirado" });
  }
};