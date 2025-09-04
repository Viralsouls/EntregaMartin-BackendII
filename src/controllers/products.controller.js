import ProductModel from "../models/Product.model.js";

// Obtener productos con filtros, paginación y ordenamiento
export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query;

    let query = {};
    if (category) {
      query.category = category;
    }

    let options = {
      limit: parseInt(limit),
      page: parseInt(page),
      lean: true, // para devolver objetos JS planos
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const products = await ProductModel.paginate(query, options);

    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid);

    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await ProductModel.findByIdAndUpdate(pid, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(pid);

    if (!deletedProduct) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", payload: deletedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};