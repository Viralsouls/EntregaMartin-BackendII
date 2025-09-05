import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";

// Config
import { connectDB } from "./config/db.js";

// Rutas
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import authRoutes from "./routes/auth.routes.js";
import viewsRoutes from "./routes/views.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/auth", authRoutes);
app.use("/", viewsRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("🟢 Nuevo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

// DB + Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
