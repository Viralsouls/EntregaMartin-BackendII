# 🛒 Ecommerce Backend - Primera Entrega

## 📌 Descripción
Este proyecto corresponde a la **primera entrega** del curso de **Backend II**.  
Se trata de un **Ecommerce básico** desarrollado en **Node.js + Express**, con persistencia en **MongoDB Atlas**.  

Incluye:
- API REST para productos y carritos.
- Persistencia en base de datos MongoDB.
- Rutas separadas por responsabilidad.
- Renderización de vistas con **Handlebars**.
- Autenticación con **JWT**.
- Control de roles (usuario y admin).
- Filtros, paginación y ordenamiento de productos.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **Node.js** | Entorno de ejecución |
| **Express.js** | Framework para el servidor |
| **MongoDB Atlas** | Base de datos en la nube |
| **Mongoose** | ODM para modelar datos |
| **Handlebars** | Motor de plantillas |
| **JWT** | Autenticación |
| **Socket.IO** | Comunicación en tiempo real |
| **Dotenv** | Variables de entorno |

---

Estructura del Proyecto 📂
```
src/
│── app.js               # Punto de entrada
│── config/
│   └── db.js            # Conexión a MongoDB
│── dao/
│   ├── products.dao.js  # Lógica de productos
│   └── carts.dao.js     # Lógica de carritos
│── models/
│   ├── Product.model.js
│   ├── Cart.model.js
│   └── User.model.js
│── routes/
│   ├── products.routes.js
│   ├── carts.routes.js
│   └── sessions.routes.js
│── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── home.handlebars
│   ├── login.handlebars
│   └── register.handlebars
│── middlewares/
│   └── auth.js          # Middleware JWT
```

## ⚙️ Instalación y ejecución

1️⃣ Clonar el repositorio:

git clone https://github.com/tuusuario/entrega-backend-1.git
cd entrega-backend-1


2️⃣ Instalar dependencias:

npm install


3️⃣ Crear un archivo .env en la raíz con el siguiente contenido:

PORT=8080
MONGO_URI=tu_conexion_a_mongodb_atlas
JWT_SECRET=supersecreto


4️⃣ Ejecutar en modo desarrollo:

npm run dev
El servidor se abrirá en 👉 http://localhost:8080

🔑 Autenticación
Registro: POST /api/sessions/register

Login: POST /api/sessions/login

Logout: GET /api/sessions/logout

El sistema genera un JWT que se guarda en cookies para proteger las rutas.

📦 Endpoints principales
🛍️ Productos
Método	Endpoint	Descripción
GET	/api/products	Listar productos (con filtros, paginación y ordenamiento)
GET	/api/products/:pid	Obtener producto por ID
POST	/api/products	Crear producto (admin)
PUT	/api/products/:pid	Actualizar producto
DELETE	/api/products/:pid	Eliminar producto

🛒 Carritos
Método	Endpoint	Descripción
GET	/api/carts	Listar carritos
GET	/api/carts/:cid	Obtener carrito por ID
POST	/api/carts	Crear carrito
PUT	/api/carts/:cid	Actualizar carrito
DELETE	/api/carts/:cid	Eliminar carrito
POST	/api/carts/add	Agregar producto al carrito

🎨 Vistas con Handlebars
/ → Catálogo de productos con filtros y paginación.

/register → Registro de usuario.

/login → Inicio de sesión.

/cart → Carrito de compras del usuario.

/profile → Perfil con historial de compras.

🧪 Pruebas rápidas (Postman/Insomnia)
Registro
POST http://localhost:8080/api/sessions/register

{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@test.com",
  "password": "123456"
}


Login

POST http://localhost:8080/api/sessions/login

{
  "email": "juan@test.com",
  "password": "123456"
}


Crear producto (admin)

POST http://localhost:8080/api/products

{
  "title": "Producto Test",
  "description": "Descripción de prueba",
  "price": 120,
  "stock": 20,
  "category": "Test"
}


Agregar producto al carrito
POST http://localhost:8080/api/carts/add

{
  "productId": "ID_DEL_PRODUCTO"
}


👨‍💻 Autor
Proyecto desarrollado por Juan Martín ✨
Entrega correspondiente a la Primera Entrega del curso Backend II.
