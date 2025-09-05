import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { authorizeRole } from "../middlewares/authorization.js";
import ProductModel from "../models/Product.model.js";
import CartModel from "../models/Cart.model.js";
import TicketModel from "../models/Ticket.model.js";

const router = Router();

// Vista Home con productos + filtros
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, category, sort, search } = req.query;

    const query = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      lean: true,
    };

    const result = await ProductModel.paginate(query, options);

    // Obtener categorías únicas para el filtro
    const categories = await ProductModel.distinct("category");

    res.render("home", {
      user: req.user || null, // opcional
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      limit,
      categories,
      selectedCategory: category || "",
      selectedSort: sort || "",
      selectedSearch: search || "",
    });
  } catch (error) {
    console.error("❌ Error en Home:", error.message);
    res.status(500).render("error", { error: "Error cargando productos" });
  }
});

// Vista Login
router.get("/login", (req, res) => {
  res.render("login");
});

// Vista Register
router.get("/register", (req, res) => {
  res.render("register");
});

// Vista Perfil (para usuarios logueados)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const cart = await CartModel.findById(req.user.cart)
      .populate("products.product")
      .lean();

    const tickets = await TicketModel.find({ purchaser: req.user.email }).lean();

    res.render("profile", {
      user: req.user,
      cart: cart || { products: [] },
      tickets,
    });
  } catch (error) {
    console.error("❌ Error en Profile:", error.message);
    res.status(500).render("error", { error: "Error cargando perfil" });
  }
});

// Vista Carrito
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const cart = await CartModel.findOne({ user: req.user._id })
      .populate("products.product")
      .lean();

    if (!cart) {
      return res.render("cart", { cart: { products: [] }, total: 0 });
    }

    const total = cart.products.reduce(
      (acc, item) => acc + (item.product.price * item.quantity),
      0
    );

    res.render("cart", { cart, total });
  } catch (error) {
    console.error("❌ Error en Cart:", error.message);
    res.status(500).render("error", { error: "Error cargando carrito" });
  }
});

// Vista Admin (solo rol admin)
router.get(
  "/admin",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const products = await ProductModel.find().lean();
      res.render("admin", { user: req.user, products });
    } catch (error) {
      console.error("❌ Error en Admin:", error.message);
      res.status(500).render("error", { error: "Error cargando admin" });
    }
  }
);

export default router;