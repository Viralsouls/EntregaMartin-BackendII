import CartModel from "../models/Cart.model.js";
import ProductModel from "../models/Product.model.js";

// Crear carrito vacío
export const createCart = async (req, res) => {
  try {
    const newCart = await CartModel.create({ products: [] });
    res.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Obtener carrito por ID con populate
export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    const product = await ProductModel.findById(pid);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }

    // Buscar si ya existe el producto en el carrito
    const existingProduct = cart.products.find((p) => p.product.toString() === pid);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Eliminar producto de un carrito
export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    cart.products = cart.products.filter((p) => p.product.toString() !== pid);

    await cart.save();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};