🛒 Ecommerce Backend – Entrega Final
📌 Descripción  
Proyecto final del curso **Backend II**.  
Se trata de un ecommerce completo desarrollado en **Node.js + Express**, con **MongoDB Atlas** como persistencia principal y arquitectura profesional:

Incluye:
- API REST para **productos**, **carritos** y **usuarios**.
- **Repository/DAO/Service** para desacoplar la lógica de negocio.
- **Autenticación** con JWT y control de roles (usuario / admin).
- **DTO en /current** para evitar exponer datos sensibles.
- **Recuperación de contraseña** con email, token de 1 h de vigencia y validación para no reutilizar la contraseña anterior.
- Filtros, **paginación** y **ordenamiento** en productos con `mongoose-paginate-v2`.
- Vistas con **Handlebars**.
- Comunicación en tiempo real con **Socket.IO**.

🚀 Tecnologías utilizadas  

| Tecnología | Uso |
|------------|-----|
| Node.js | Entorno de ejecución |
| Express.js | Framework para el servidor |
| MongoDB Atlas | Base de datos en la nube |
| Mongoose | ODM para modelar datos |
| mongoose-paginate-v2 | Paginación de productos |
| Handlebars | Motor de plantillas |
| JWT + Passport | Autenticación y roles |
| Nodemailer | Envío de correos para recuperación de contraseña |
| Socket.IO | Comunicación en tiempo real |
| Dotenv | Variables de entorno |

📂 Estructura del proyecto

src/
│── app.js
│── config/
│ └── db.js
│── dao/
│ ├── products.dao.js
│ ├── carts.dao.js
│ └── users.dao.js
│── repositories/
│ ├── ProductsRepository.js
│ ├── CartsRepository.js
│ └── UsersRepository.js
│── services/
│ ├── products.service.js
│ ├── carts.service.js
│ └── users.service.js
│── models/
│ ├── Product.model.js
│ ├── Cart.model.js
│ └── User.model.js
│── routes/
│ ├── products.routes.js
│ ├── carts.routes.js
│ └── sessions.routes.js
│── dtos/
│ └── CurrentUserDTO.js
│── middlewares/
│ ├── auth.js
│ ├── roles.js
│ └── errorHandler.js
│── utils/
│ ├── mailer.js
│ └── jwt.js
│── views/
│ ├── layouts/
│ │ └── main.handlebars
│ ├── home.handlebars
│ ├── login.handlebars
│ ├── register.handlebars
│ └── profile.handlebars

bash
Copy code

⚙️ Instalación y ejecución  

1️⃣ Clonar el repositorio  
```bash
git clone https://github.com/tuusuario/entrega-backend-final.git
cd entrega-backend-final
2️⃣ Instalar dependencias

bash
Copy code
npm install
3️⃣ Crear un archivo .env en la raíz con el siguiente contenido:

env
Copy code
PORT=8080
MONGODB_URI=tu_conexion_a_mongodb_atlas
JWT_SECRET=supersecreto
MAIL_USER=tu_correo@example.com
MAIL_PASS=tu_app_password
TOKEN_EXPIRATION_HOURS=1
4️⃣ Ejecutar en modo desarrollo

bash
Copy code
npm run dev
El servidor se abrirá en 👉 http://localhost:8080

🔑 Autenticación y roles

Registro: POST /api/sessions/register

Login: POST /api/sessions/login

Current user (DTO): GET /api/sessions/current

Recuperación de contraseña:

POST /api/sessions/recover (envía email con token válido 1 h)

POST /api/sessions/reset/:token (cambia contraseña y valida que no sea igual a la anterior)

Solo admin puede crear, actualizar o eliminar productos.

📦 Endpoints principales

🛍️ Productos

Método	Endpoint	Descripción
GET	/api/products	Listar productos con limit, page, sort, query
GET	/api/products/:pid	Obtener producto por ID
POST	/api/products	Crear producto (admin)
PUT	/api/products/:pid	Actualizar producto (admin)
DELETE	/api/products/:pid	Eliminar producto (admin)

GET /api/products soporta:

limit (default 10)

page (default 1)

sort (asc|desc por precio)

query (true|false para status o categoría)

🛒 Carritos

Método	Endpoint	Descripción
POST	/api/carts	Crear carrito
GET	/api/carts/:cid	Ver detalle con productos (populate)
POST	/api/carts/:cid/product/:pid	Agregar producto (+1 si existe)
PUT	/api/carts/:cid	Reemplazar arreglo de productos
PUT	/api/carts/:cid/product/:pid	Actualizar cantidad
DELETE	/api/carts/:cid/product/:pid	Eliminar producto del carrito
DELETE	/api/carts/:cid	Vaciar carrito

👁️ Sesiones / Usuario
Incluye login, registro, /current con DTO, y recuperación de contraseña.

🎨 Vistas con Handlebars

/ → Catálogo de productos paginado.

/register → Registro de usuario.

/login → Inicio de sesión.

/cart → Carrito de compras.

/profile → Perfil del usuario.

🧪 Pruebas rápidas (Postman/Insomnia)

bash
Copy code
# Registro
POST http://localhost:8080/api/sessions/register
{ "first_name": "Juan", "last_name": "Pérez", "email": "juan@test.com", "password": "123456" }

# Login
POST http://localhost:8080/api/sessions/login
{ "email": "juan@test.com", "password": "123456" }

# Productos paginados
GET http://localhost:8080/api/products?limit=5&page=2&sort=asc&query=shoes
👨‍💻 Autor
Proyecto desarrollado por Juan Martín ✨
Entrega correspondiente a la Entrega Final del curso Backend II.
