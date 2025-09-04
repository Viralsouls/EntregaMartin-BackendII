import ProductModel from "../models/Product.model.js";

class ProductDAO {
  async getAll(filter = {}, options = {}) {
    return await ProductModel.paginate(filter, { ...options, lean: true });
  }

  async getById(id) {
    return await ProductModel.findById(id).lean();
  }

  async create(productData) {
    return await ProductModel.create(productData);
  }

  async update(id, updateData) {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductDAO();