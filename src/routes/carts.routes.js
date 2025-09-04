import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import cartDAO from "../dao/carts.dao.js";
import ticketDAO from "../dao/tickets.dao.js";

const router = Router();

// ✅ Obtener carrito por ID (solo usuario logueado)
router.get("/:cid", authMiddleware(["user", "admin"]), async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.cid);
    if (!cart) return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// ✅ Agregar producto al carrito
router.post("/:cid/products/:pid", authMiddleware(["user"]), async (req, res) => {
  try {
    const cart = await cartDAO.addProduct(req.params.cid, req.params.pid);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// ✅ Eliminar producto del carrito
router.delete("/:cid/products/:pid", authMiddleware(["user"]), async (req, res) => {
  try {
    const cart = await cartDAO.removeProduct(req.params.cid, req.params.pid);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// ✅ Finalizar compra y generar ticket
router.post("/:cid/purchase", authMiddleware(["user"]), async (req, res) => {
  try {
    const result = await ticketDAO.purchase(req.params.cid, req.user.email);
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

export default router;