import CartsRepository from "../repositories/carts.repository.js";
import ProductsRepository from "../repositories/products.repository.js";

const cartsRepo = new CartsRepository();
const productsRepo = new ProductsRepository();

export const addToUserCart = async ({ userId, productId, quantity = 1 }) => {
  let cart = await cartsRepo.getByUser(userId);
  if (!cart) cart = await cartsRepo.create({ user: userId, products: [] });

  // validar que el producto exista
  const p = await productsRepo.findById(productId);
  if (!p) throw new Error("Producto inexistente");

  const idx = cart.products.findIndex(i => i.product.toString() === productId);
  if (idx >= 0) cart.products[idx].quantity += quantity;
  else cart.products.push({ product: productId, quantity });

  await cartsRepo.save(cart);
  return cart;
};