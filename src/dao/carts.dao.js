// src/dao/carts.dao.js
import CartModel from "../models/Cart.model.js";

export default class CartsDao {
  // Obtener todos los carritos
  async getCarts() {
    return await CartModel.find().populate("products.product");
  }

  // Obtener carrito por ID
  async getCartById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  // Obtener carrito por ID de usuario
  async getCartByUserId(userId) {
    return await CartModel.findOne({ user: userId }).populate("products.product");
  }

  // Crear carrito
  async addCart(cartData) {
    return await CartModel.create(cartData);
  }

  // Actualizar carrito
  async updateCart(id, cartData) {
    return await CartModel.findByIdAndUpdate(id, cartData, { new: true });
  }

  // Eliminar carrito
  async deleteCart(id) {
    return await CartModel.findByIdAndDelete(id);
  }

  // ✅ Agregar producto a carrito
  async addProductToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return await cart.populate("products.product");
  }
}