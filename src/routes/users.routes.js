import { Router } from "express";
import userDAO from "../dao/users.dao.js";
import { authMiddleware, authRole } from "../middleware/auth.js";

const router = Router();

// 📌 Obtener todos los usuarios (solo admin)
router.get("/", authMiddleware, authRole("admin"), async (req, res) => {
  try {
    const users = await userDAO.getAll();
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// 📌 Obtener un usuario por ID (solo admin)
router.get("/:id", authMiddleware, authRole("admin"), async (req, res) => {
  try {
    const user = await userDAO.getById(req.params.id);
    if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// 📌 Actualizar usuario (solo admin)
router.put("/:id", authMiddleware, authRole("admin"), async (req, res) => {
  try {
    const updatedUser = await userDAO.update(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", payload: updatedUser });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// 📌 Eliminar usuario (solo admin)
router.delete("/:id", authMiddleware, authRole("admin"), async (req, res) => {
  try {
    const deletedUser = await userDAO.delete(req.params.id);
    if (!deletedUser) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", payload: deletedUser });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;