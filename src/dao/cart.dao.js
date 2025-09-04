import CartModel from "../models/Cart.model.js";

class CartDAO {
  async getByUser(userId) {
    return await CartModel.findOne({ user: userId }).populate("products.product").lean();
  }

  async create(userId) {
    return await CartModel.create({ user: userId, products: [] });
  }

  async addProduct(userId, productId, quantity = 1) {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async updateProduct(userId, productId, quantity) {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return null;

    const product = cart.products.find(p => p.product.toString() === productId);
    if (!product) return null;

    product.quantity = quantity;
    return await cart.save();
  }

  async removeProduct(userId, productId) {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    return await cart.save();
  }

  async clearCart(userId) {
    return await CartModel.findOneAndUpdate(
      { user: userId },
      { products: [] },
      { new: true }
    );
  }
}

export default new CartDAO();