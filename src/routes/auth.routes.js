// src/routes/auth.routes.js
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Login (ejemplo básico)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulación de login
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Login exitoso", token });
  }

  res.status(401).json({ message: "Credenciales inválidas" });
});

// Ruta protegida de ejemplo
router.get("/profile", (req, res) => {
  res.json({ message: "Ruta protegida (falta middleware JWT real)" });
});

export default router;