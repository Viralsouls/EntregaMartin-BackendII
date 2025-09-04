import express from "express";
import handlebars from "express-handlebars";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import __dirname from "./utils.js";

// Rutas
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import sessionsRoutes from "./routes/sessions.routes.js";

// Middlewares
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// 🔹 Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔹 Passport
initializePassport();
app.use(passport.initialize());

// 🔹 Archivos estáticos
app.use(express.static(__dirname + "/public"));

// 🔹 Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// 🔹 Rutas
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/", viewsRoutes);

// 🔹 Conectar a MongoDB y arrancar servidor
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
  );
});