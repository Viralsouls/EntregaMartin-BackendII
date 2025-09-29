import { Router } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { authMiddleware } from "../middlewares/auth.js";
import UserDTO from "../dtos/user.dto.js";

const router = Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).send({ status: "error", error: "User already exists" });
    }

    const hashedPassword = await createHash(password);

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.redirect("/login");
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send({ status: "error", error: "Failed to register user" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ status: "error", error: "User not found" });
    }

    const validPassword = await isValidPassword(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ status: "error", error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ status: "error", error: "Login failed" });
  }
});

// Logout (borra cookie)
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// Obtener perfil del usuario actual (protegido)
router.get("/current", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).lean();
    if (!user) return res.status(404).send({ status: "error", error: "User not found" });
    const safeUser = new UserDTO(user);
    res.send({ status: "success", payload: safeUser });
  } catch (e) {
    res.status(500).send({ status: "error", error: "Failed to fetch current user" });
  }
});

export default router;