import jwt from "jsonwebtoken";

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.jwt; // 📌 Token viene en cookie (login)
      if (!token) {
        return res.status(401).json({ status: "error", error: "No autorizado, token faltante" });
      }

      // Verificamos token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // 📌 Guardamos el usuario en req.user

      // Si hay roles definidos, validamos
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ status: "error", error: "Acceso denegado: permisos insuficientes" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ status: "error", error: "Token inválido o expirado" });
    }
  };
};