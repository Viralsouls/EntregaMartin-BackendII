import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import passport from "passport";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import initializePassport from "./config/passport.config.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import sessionRoutes from "./routes/sessions.routes.js";
import userRoutes from "./routes/users.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import sockets from "./sockets.js";
import { handlebarsHelpers } from "./utils/handlebars-helper.js";


dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("src/public"));

// Handlebars
app.engine("handlebars", handlebars.engine({
  helpers: {
    multiply: (a, b) => a * b,
    sum: (products) => {
      return products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
  }
}));
app.set("views", "src/views");
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine({ helpers: handlebarsHelpers }));

// MongoDB + Sessions
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Error MongoDB:", err));

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 3600,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);
app.use("/", viewsRoutes);

// WebSockets
sockets(io);

// Servidor
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));