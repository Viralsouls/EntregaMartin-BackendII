import ProductsRepository from "../repositories/products.repository.js";

const repo = new ProductsRepository();

export const listProducts = ({ query = {}, options = {} }) => repo.paginate(query, options);
export const createProduct = (data) => repo.create(data);
export const updateProduct = (id, data) => repo.update(id, data);
export const deleteProduct = (id) => repo.delete(id);
export const getCategories = () => repo.distinctCategories();