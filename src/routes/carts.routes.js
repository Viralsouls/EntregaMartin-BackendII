// src/routes/carts.routes.js

import { Router } from "express";
import CartsDao from "../dao/carts.dao.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();
const cartDao = new CartsDao();

// ✅ Obtener todos los carritos
router.get("/", authMiddleware, async (req, res) => {
  try {
    const carts = await cartDao.getCarts();
    res.status(200).send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

// ✅ Obtener un carrito por ID
router.get("/:cid", authMiddleware, async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getCartById(cid);

    if (!cart) {
      return res.status(404).send({ status: "error", message: "Cart not found" });
    }

    res.status(200).send({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

// ✅ Crear un carrito nuevo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newCart = await cartDao.addCart(req.body);
    res.status(201).send({ status: "success", payload: newCart });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

// ✅ Actualizar un carrito por ID
router.put("/:cid", authMiddleware, async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCart = await cartDao.updateCart(cid, req.body);

    if (!updatedCart) {
      return res.status(404).send({ status: "error", message: "Cart not found" });
    }

    res.status(200).send({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

// ✅ Eliminar un carrito por ID
router.delete("/:cid", authMiddleware, async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await cartDao.deleteCart(cid);

    if (!deletedCart) {
      return res.status(404).send({ status: "error", message: "Cart not found" });
    }

    res.status(200).send({ status: "success", message: "Cart deleted" });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

export default router;
