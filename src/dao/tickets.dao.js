import Ticket from "../models/Ticket.model.js";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

class TicketDAO {
  async purchase(cartId, purchaserEmail) {
    const cart = await Cart.findById(cartId).populate("products.product");
    if (!cart) throw new Error("Carrito no encontrado");

    let total = 0;
    const productsNotPurchased = [];

    for (const item of cart.products) {
      const product = await Product.findById(item.product._id);
      if (!product) continue;

      if (product.stock >= item.quantity) {
        // Reducir stock y sumar al total
        product.stock -= item.quantity;
        await product.save();

        total += product.price * item.quantity;
      } else {
        // Si no hay stock suficiente, no se compra
        productsNotPurchased.push({
          product: product._id,
          quantity: item.quantity
        });
      }
    }

    // Generar ticket solo si hubo productos comprados
    let ticket = null;
    if (total > 0) {
      ticket = await Ticket.create({
        code: Math.random().toString(36).substring(2, 10).toUpperCase(),
        purchase_datetime: new Date(),
        amount: total,
        purchaser: purchaserEmail
      });
    }

    // Actualizar carrito con productos no comprados
    cart.products = productsNotPurchased;
    await cart.save();

    return {
      ticket,
      unprocessedProducts: productsNotPurchased
    };
  }
}

export default new TicketDAO();