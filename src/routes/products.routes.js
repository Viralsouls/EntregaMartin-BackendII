import { Router } from "express";
import ProductDao from "../dao/products.dao.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();
const productDao = new ProductDao();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await productDao.getAll();
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Obtener un producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const product = await productDao.getById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Crear un producto (requiere login)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProduct = await productDao.create(req.body);
    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Actualizar un producto
router.put("/:pid", authMiddleware, async (req, res) => {
  try {
    const updatedProduct = await productDao.update(req.params.pid, req.body);
    res.json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Eliminar un producto
router.delete("/:pid", authMiddleware, async (req, res) => {
  try {
    await productDao.delete(req.params.pid);
    res.json({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;