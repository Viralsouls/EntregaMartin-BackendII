import CartModel from "../models/Cart.model.js";

export default class CartsRepository {
  getByUser(userId) { return CartModel.findOne({ user: userId }).populate("products.product"); }
  getById(id) { return CartModel.findById(id).populate("products.product"); }
  create(data) { return CartModel.create(data); }
  save(doc) { return doc.save(); }
}