import ProductsRepository from "../repositories/products.repository.js";
import CartsRepository from "../repositories/carts.repository.js";
import TicketsRepository from "../repositories/tickets.repository.js";
import crypto from "crypto";

const productsRepo = new ProductsRepository();
const cartsRepo = new CartsRepository();
const ticketsRepo = new TicketsRepository();

export const checkoutCart = async ({ user }) => {
  // consigue el carrito del user con populate
  const cart = await cartsRepo.getByUser(user._id);
  if (!cart || cart.products.length === 0) {
    return { completed: false, message: "Carrito vacío" };
  }

  const purchasable = [];
  const rejected = [];

  // validar stock
  for (const item of cart.products) {
    const p = item.product;
    if (p.stock >= item.quantity) {
      purchasable.push({ product: p, quantity: item.quantity, price: p.price });
    } else {
      rejected.push({ product: p._id, wanted: item.quantity, available: p.stock });
    }
  }

  // descuenta stock solo de los comprables
  let total = 0;
  for (const it of purchasable) {
    total += it.price * it.quantity;
    // update stock
    await productsRepo.update(it.product._id, { stock: it.product.stock - it.quantity });
  }

  // genera ticket si hay algo comprable
  let ticket = null;
  if (purchasable.length > 0) {
    ticket = await ticketsRepo.create({
      code: crypto.randomBytes(10).toString("hex"),
      amount: total,
      purchaser: user.email,
      products: purchasable.map(p => ({ product: p.product._id, quantity: p.quantity, price: p.price })),
    });
  }

  // limpia del carrito lo comprado y deja lo rechazado
  cart.products = cart.products.filter(cp =>
    !purchasable.some(pp => pp.product._id.toString() === cp.product._id.toString())
  );
  await cartsRepo.save(cart);

  return {
    completed: rejected.length === 0,
    ticket,
    rejected,
  };
};