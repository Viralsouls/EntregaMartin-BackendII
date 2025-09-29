// src/routes/auth.routes.js
import { Router } from "express";
import { requestPasswordReset, validateResetToken, consumeReset } from "../services/passwordReset.service.js";

const router = Router();

// 1) solicitar reset - no revela si el email existe
router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    await requestPasswordReset(email);
    res.send({ status: "success", message: "Si el email existe, se envió un enlace de recuperación." });
  } catch (e) {
    res.status(500).send({ status: "error", error: e.message });
  }
});

// 2) mostrar form de reset (vista)
router.get("/reset/:token", async (req, res) => {
  try {
    const ok = await validateResetToken(req.params.token);
    if (!ok) return res.status(400).render("error", { error: "Enlace inválido o expirado" });
    res.render("auth/resetPassword", { token: req.params.token });
  } catch {
    res.status(500).render("error", { error: "Error al validar enlace" });
  }
});

// 3) consumir el reset y guardar nueva contraseña
router.post("/reset", async (req, res) => {
  try {
    const { token, password } = req.body;
    await consumeReset({ token, newPassword: password });
    res.send({ status: "success", message: "Contraseña actualizada. Ya podés iniciar sesión." });
  } catch (e) {
    res.status(400).send({ status: "error", error: e.message });
  }
});

export default router;