// src/dao/carts.dao.js

import CartModel from "../models/Cart.model.js";

export default class CartsDao {
  // Obtener todos los carritos
  async getCarts() {
    try {
      return await CartModel.find().populate("products.product");
    } catch (error) {
      throw new Error("Error fetching carts: " + error.message);
    }
  }

  // Obtener un carrito por ID
  async getCartById(id) {
    try {
      return await CartModel.findById(id).populate("products.product");
    } catch (error) {
      throw new Error("Error fetching cart by ID: " + error.message);
    }
  }

  // Crear un carrito nuevo
  async addCart(cartData) {
    try {
      const newCart = new CartModel(cartData);
      return await newCart.save();
    } catch (error) {
      throw new Error("Error creating cart: " + error.message);
    }
  }

  // Actualizar un carrito (ej: modificar productos dentro del carrito)
  async updateCart(id, cartData) {
    try {
      return await CartModel.findByIdAndUpdate(id, cartData, { new: true }).populate("products.product");
    } catch (error) {
      throw new Error("Error updating cart: " + error.message);
    }
  }

  // Eliminar un carrito
  async deleteCart(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting cart: " + error.message);
    }
  }
}
