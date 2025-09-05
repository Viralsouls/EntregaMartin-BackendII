// src/dao/products.dao.js

import ProductModel from "../models/Product.model.js";

export default class ProductsDao {
  async getProducts() {
    try {
      return await ProductModel.find();
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }

  async getProductById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error("Error fetching product by ID: " + error.message);
    }
  }

  async addProduct(productData) {
    try {
      const newProduct = new ProductModel(productData);
      return await newProduct.save();
    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  }
}