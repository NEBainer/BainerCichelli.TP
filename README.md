# 🛒GigaShop
![Vista principal](screen.png)

Sistema de gestión para un autoservicio de productos tecnológicos desarrollado como Trabajo Práctico Integrador para **Programación III**.

## 👥 Integrantes

- Nicolás Ezequiel Bainer
- Lucía Fiorella Cicchelli

---

# 📌 Descripción

La aplicación está compuesta por dos módulos:

- **Frontend Cliente**
  - Permite visualizar productos.
  - Agregar productos al carrito.
  - Confirmar compras.
  - Descargar un comprobante en PDF.

- **Panel de Administración**
  - Login de administrador.
  - Gestión completa de productos (CRUD).
  - Activación y desactivación lógica.
  - Carga de imágenes.
  - API REST para productos y ventas.

---

# 🚀 Tecnologías utilizadas

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)
- Express Session
- Multer
- bcrypt

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- jsPDF

---

# 📂 Estructura del proyecto

```
.
├── config/
├── controllers/
├── frontend/
├── middlewares/
├── prisma/
├── public/
├── routes/
├── src/
├── views/
├── app.js
└── package.json
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/NEBainer/BainerCichelli.TP.git
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar las variables de entorno

Crear un archivo `.env`

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:password@host:5432/database"
SESSION_SECRET="programacion3tp"
```

---

## 4. Generar Prisma

```bash
npx prisma generate
```

---

## 5. Ejecutar el proyecto

```bash
npm start
```

o

```bash
npm run dev
```

---

# 🔐 Acceso al panel administrador

```
http://localhost:3000/login
```

El login incluye un botón de **Acceso rápido** que autocompleta las credenciales para facilitar las pruebas.

---

# 🌐 Frontend Cliente

```
http://localhost:3000/frontend/index.html
```

---

# <i class="fa-solid fa-box"></i> Funcionalidades

## Cliente

- Pantalla de bienvenida
- Cambio de tema (Claro/Oscuro)
- Visualización de productos
- Filtrado por categorías
- Paginación
- Carrito de compras
- Confirmación mediante modal
- Ticket de compra
- Descarga de PDF

---

## Administrador

- Login
- CRUD de productos
- Subida de imágenes
- Validaciones
- Baja lógica
- Reactivación de productos

---

# 🔌 API REST

## Productos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/api/productos` | Obtiene los productos |
| GET | `/api/productos/:id` | Obtiene un producto |

### Parámetros

| Parámetro | Descripción |
|-----------|-------------|
| categoria | Filtra por categoría |
| buscar | Busca por nombre |
| page | Paginación |

Ejemplo:

```
GET /api/productos?categoria=Componente&page=2
```

---

## Ventas

| Método | Endpoint |
|---------|----------|
| POST | `/api/ventas` |
| GET | `/api/ventas` |
| GET | `/api/ventas/:id` |

Ejemplo:

```json
{
  "cliente": "Juan Perez",
  "productos": [
    {
      "id": 5,
      "cantidad": 2
    }
  ]
}
```

---

## Usuarios

| Método | Endpoint |
|---------|----------|
| POST | `/api/usuarios` |

Permite crear un usuario administrador con contraseña encriptada mediante **bcrypt**.

---

# 📋 Características implementadas

- Arquitectura MVC
- API REST
- Prisma ORM
- PostgreSQL
- Autenticación mediante sesiones
- Contraseñas encriptadas
- Middlewares de validación
- Carga de imágenes con Multer
- Baja lógica de productos
- Gestión de stock
- Ticket de compra en PDF
- Diseño responsive
- Modo claro / oscuro
- Paginación de productos

---

# 📚 Trabajo Práctico

Trabajo Práctico Integrador correspondiente a la materia **Programación III**.

Universidad Tecnológica Nacional (UTN).
