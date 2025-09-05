import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import { Server as SocketServer } from "socket.io";
import http from "http";

import connectDB from "./config/db.js";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import authRouter from "./routes/auth.routes.js";

// 🔹 Inicializar Express
const app = express();
const PORT = process.env.PORT || 8080;

// 📂 Rutas absolutas para usar con vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// 🔹 Rutas API y Vistas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/auth", authRouter);
app.use("/", viewsRouter);

// 🔹 Conectar DB
connectDB();

// 🔹 Server + Socket.io
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log("🟢 Nuevo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

// 🔹 Iniciar server
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});