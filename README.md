## API REST

La aplicación expone los siguientes endpoints para ser consumidos por el frontend del autoservicio y el panel de administración.

### Productos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/api/productos` | Obtiene el listado de productos activos. Admite filtros y paginación. |
| GET | `/api/productos/:id` | Obtiene la información de un producto específico. |

#### Parámetros soportados

| Parámetro | Ejemplo | Descripción |
|-----------|----------|-------------|
| `page` | `/api/productos?page=2` | Página de resultados. |
| `categoria` | `/api/productos?categoria=Componente` | Filtra por categoría. |
| `buscar` | `/api/productos?buscar=logitech` | Busca productos por nombre. |

---

### Ventas

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/api/ventas` | Registra una venta, calcula el total y descuenta el stock. |
| GET | `/api/ventas` | Devuelve el historial de ventas. |
| GET | `/api/ventas/:id` | Devuelve el detalle de una venta específica. |

---

### Usuarios

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/api/usuarios` | Crea un usuario administrador con contraseña encriptada. |

---

### Autenticación

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/login` | Muestra el formulario de inicio de sesión. |
| POST | `/login` | Valida las credenciales del administrador. |
| GET | `/logout` | Finaliza la sesión del administrador. |