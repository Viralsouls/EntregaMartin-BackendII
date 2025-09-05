import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Leer token desde cookie o header
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ status: "error", error: "No token provided" });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos el usuario en req

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).send({ status: "error", error: "Unauthorized" });
  }
};