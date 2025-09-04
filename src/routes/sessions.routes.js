import { Router } from "express";
import sessionsDAO from "../dao/sessions.dao.js";

const router = Router();

// 📌 Registro
router.post("/register", async (req, res) => {
  try {
    const newUser = await sessionsDAO.register(req.body);
    res.json({ status: "success", payload: newUser });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// 📌 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await sessionsDAO.login(email, password);

    // Guardamos el token en cookie HTTPOnly
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ status: "success", payload: user, token });
  } catch (error) {
    res.status(401).json({ status: "error", error: error.message });
  }
});

// 📌 Logout
router.post("/logout", async (req, res) => {
  try {
    const result = await sessionsDAO.logout();
    res.clearCookie("jwt");
    res.json({ status: "success", message: result.message });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;