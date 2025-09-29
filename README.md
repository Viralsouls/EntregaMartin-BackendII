🛒 Ecommerce Backend – Entrega Final
📌 Descripción  
Proyecto final del curso Backend II. Un ecommerce completo con Node.js + Express y MongoDB Atlas, con capas bien separadas, autenticación, roles, recuperación de contraseña, paginación/filtros para productos y vistas con Handlebars.

Incluye:

- API REST de **productos, carritos y usuarios**  
- Patrones **DAO / Repository / Service**  
- **JWT / Passport** para auth + roles  
- **DTO en /current** para evitar exponer datos sensibles  
- Recuperación de contraseña (token 1 h, no repetir antigua)  
- Paginación, filtros y ordenamiento en productos con `mongoose-paginate-v2`  
- Renderizado con Handlebars + vistas principales  
- Comunicación en tiempo real con Socket.IO  

🚀 Tecnologías utilizadas  

| Tecnología | Uso |
|------------|-----|
| Node.js | Entorno de ejecución |
| Express.js | Framework del servidor |
| MongoDB Atlas | Base de datos |
| Mongoose | ODM |
| mongoose-paginate-v2 | Paginación productos |
| Handlebars | Motor de vistas |
| JWT + Passport | Autenticación y roles |
| Nodemailer | Envío de emails para recuperación contraseña |
| Socket.IO | Tiempo real |
| Dotenv | Variables de entorno |

📂 Estructura del proyecto

```
src/
│── app.js
│── config/
│   └── db.js
│── dao/
│   ├── products.dao.js
│   ├── carts.dao.js
│   └── users.dao.js
│── repositories/
│   ├── ProductsRepository.js
│   ├── CartsRepository.js
│   └── UsersRepository.js
│── services/
│   ├── products.service.js
│   ├── carts.service.js
│   └── users.service.js
│── models/
│   ├── Product.model.js
│   ├── Cart.model.js
│   └── User.model.js
│── routes/
│   ├── products.routes.js
│   ├── carts.routes.js
│   └── sessions.routes.js
│── dtos/
│   └── CurrentUserDTO.js
│── middlewares/
│   ├── auth.js
│   ├── roles.js
│   └── errorHandler.js
│── utils/
│   ├── mailer.js
│   └── jwt.js
│── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── home.handlebars
│   ├── login.handlebars
│   ├── register.handlebars
│   └── profile.handlebars
README.md
```

⚙️ Instalación y ejecución  
1️⃣ Clonar el repositorio  
```bash
git clone https://github.com/tuusuario/EntregaMartin-BackendII.git  
cd EntregaMartin-BackendII
```  
2️⃣ Instalar dependencias  
```bash
npm install
```  
3️⃣ Crear `.env` en la raíz con este contenido:  
```env
PORT=8080  
MONGODB_URI=tu_conexion_mongodb  
JWT_SECRET=supersecreto  
MAIL_USER=tu_correo@example.com  
MAIL_PASS=tu_app_password  
TOKEN_EXPIRATION_HOURS=1  
```  
4️⃣ Ejecutar en modo dev  
```bash
npm run dev
```  
Se levanta en 👉 http://localhost:8080  

🔑 Autenticación y Sesiones  
- Registro: `POST /api/sessions/register`  
- Login: `POST /api/sessions/login`  
- Current (DTO): `GET /api/sessions/current`  
- Recuperar contraseña: `POST /api/sessions/recover`  
- Reset: `POST /api/sessions/reset/:token`  
⚠️ Sólo **admin** puede crear, editar o eliminar productos  

📦 Endpoints principales  

**Productos**  
- `GET /api/products` → listado (limit, page, sort, query)  
- `GET /api/products/:pid` → ver por ID  
- `POST /api/products` → crear (admin)  
- `PUT /api/products/:pid` → actualizar (admin)  
- `DELETE /api/products/:pid` → eliminar (admin)  

**Carritos**  
- `POST /api/carts` → crear carrito  
- `GET /api/carts/:cid` → detalle con productos (populate)  
- `POST /api/carts/:cid/product/:pid` → agregar producto (o +1 si ya existe)  
- `PUT /api/carts/:cid` → reemplazar arreglo completo  
- `PUT /api/carts/:cid/product/:pid` → actualizar cantidad  
- `DELETE /api/carts/:cid/product/:pid` → eliminar producto  
- `DELETE /api/carts/:cid` → vaciar carrito  

🎨 Vistas con Handlebars  
- `/` → Catálogo productos  
- `/register` → Registro  
- `/login` → Inicio de sesión  
- `/cart` → Ver carrito  
- `/profile` → Perfil de usuario  

🧪 Pruebas rápidas (Postman / Insomnia)  
```bash
# Registro
POST http://localhost:8080/api/sessions/register  
{ "first_name":"Juan", "last_name":"Pérez", "email":"juan@test.com", "password":"123456" }  

# Login
POST http://localhost:8080/api/sessions/login  
{ "email":"juan@test.com", "password":"123456" }  

# Productos paginados
GET http://localhost:8080/api/products?limit=5&page=2&sort=asc&query=shoes  
```  

👨‍💻 Autor  
Proyecto desarrollado por **Juan Martín** ✨  
Entrega correspondiente a la **Entrega Final – Backend II**
