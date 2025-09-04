import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import productDAO from "../dao/products.dao.js";

const router = Router();

// ✅ Obtener todos los productos (público)
router.get("/", async (req, res) => {
  try {
    const products = await productDAO.getAll();
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// ✅ Obtener un producto por ID (público)
router.get("/:id", async (req, res) => {
  try {
    const product = await productDAO.getById(req.params.id);
    if (!product) return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    res.json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// ✅ Crear producto (solo admin)
router.post("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const newProduct = await productDAO.create(req.body);
    res.json({ status: "success", payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// ✅ Actualizar producto (solo admin)
router.put("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const updatedProduct = await productDAO.update(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    res.json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// ✅ Eliminar producto (solo admin)
router.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const deleted = await productDAO.delete(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    res.json({ status: "success", payload: deleted });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;