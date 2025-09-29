import ProductModel from "../models/Product.model.js";

export default class ProductsRepository {
  async paginate(query, options) { return ProductModel.paginate(query, options); }
  async findById(id) { return ProductModel.findById(id); }
  async create(data) { return ProductModel.create(data); }
  async update(id, data) { return ProductModel.findByIdAndUpdate(id, data, { new: true }); }
  async delete(id) { return ProductModel.findByIdAndDelete(id); }
  async distinctCategories() { return ProductModel.distinct("category"); }
}