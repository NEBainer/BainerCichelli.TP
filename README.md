# API REST

La aplicación expone los siguientes endpoints para ser consumidos por el frontend del autoservicio y el panel de administración.

---

# Productos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/api/productos` | Obtiene el listado de productos activos. Admite filtros y paginación. |
| GET | `/api/productos/:id` | Obtiene la información de un producto específico. |

## Parámetros soportados

| Parámetro | Ejemplo | Descripción |
|-----------|----------|-------------|
| `page` | `/api/productos?page=2` | Página de resultados. |
| `categoria` | `/api/productos?categoria=Componente` | Filtra por categoría. |
| `buscar` | `/api/productos?buscar=Ryzen` | Busca productos por nombre. |

Los parámetros pueden combinarse.

### Ejemplo

```text
GET /api/productos?categoria=Componente&buscar=Ryzen&page=1
```

---

# Ventas

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/api/ventas` | Registra una venta, calcula el total, crea el detalle de la venta y descuenta el stock. |

## Body esperado

```json
{
  "cliente": "Juan Perez",
  "productos": [
    {
      "id": 5,
      "cantidad": 2
    },
    {
      "id": 7,
      "cantidad": 1
    }
  ]
}
```

## Respuesta exitosa

```json
{
  "ok": true,
  "mensaje": "Venta registrada correctamente.",
  "venta": {
    "id": 1,
    "cliente": "Juan Perez",
    "fecha": "2026-06-27T22:00:00.000Z",
    "total": 365000
  }
}
```

---

# Usuarios

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/api/usuarios` | Crea un usuario administrador con contraseña encriptada mediante bcrypt. |

---

# Autenticación

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/login` | Muestra el formulario de inicio de sesión. |
| POST | `/login` | Valida las credenciales del administrador. |
| GET | `/logout` | Finaliza la sesión del administrador. |