# API REST

La aplicación expone los siguientes endpoints para ser consumidos por el frontend del autoservicio y el panel de administración.

---

# Productos

| Método | Endpoint             | Descripción                                                           |
| ------ | -------------------- | --------------------------------------------------------------------- |
| GET    | `/api/productos`     | Obtiene el listado de productos activos. Admite filtros y paginación. |
| GET    | `/api/productos/:id` | Obtiene la información de un producto específico.                     |

## Parámetros soportados

| Parámetro   | Ejemplo                               | Descripción                 |
| ----------- | ------------------------------------- | --------------------------- |
| `page`      | `/api/productos?page=2`               | Página de resultados.       |
| `categoria` | `/api/productos?categoria=Componente` | Filtra por categoría.       |
| `buscar`    | `/api/productos?buscar=Ryzen`         | Busca productos por nombre. |

Los parámetros pueden combinarse.

### Ejemplo

```text
GET /api/productos?categoria=Componente&buscar=Ryzen&page=1
```

### Respuesta

```json
{
  "ok": true,
  "pagina": 1,
  "totalPaginas": 1,
  "totalProductos": 3,
  "cantidad": 3,
  "productos": [
    {
      "id": 6,
      "nombre": "Ryzen 7 7700",
      "categoria": "Componente",
      "marca": "AMD",
      "precio": 140000,
      "stock": 2,
      "activo": true,
      "imagen": "imagen.jpg"
    }
  ]
}
```

---

# Ventas

| Método | Endpoint          | Descripción                                                                             |
| ------ | ----------------- | --------------------------------------------------------------------------------------- |
| POST   | `/api/ventas`     | Registra una venta, calcula el total, crea el detalle de la venta y descuenta el stock. |
| GET    | `/api/ventas`     | Devuelve el historial de ventas junto con los productos vendidos.                       |
| GET    | `/api/ventas/:id` | Devuelve el detalle de una venta específica.                                            |

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

### Historial de ventas

```text
GET /api/ventas
```

Respuesta:

```json
{
  "ok": true,
  "cantidad": 1,
  "ventas": [
    {
      "id": 1,
      "cliente": "Juan Perez",
      "fecha": "2026-06-27T22:00:00.000Z",
      "total": 365000,
      "productos": [
        {
          "cantidad": 2,
          "producto": {
            "id": 5,
            "nombre": "Ryzen 7 7700",
            "marca": "AMD",
            "precio": 140000
          }
        }
      ]
    }
  ]
}
```

### Detalle de una venta

```text
GET /api/ventas/1
```

Devuelve una única venta con todos sus productos asociados.

---

# Usuarios

| Método | Endpoint        | Descripción                                                              |
| ------ | --------------- | ------------------------------------------------------------------------ |
| POST   | `/api/usuarios` | Crea un usuario administrador con contraseña encriptada mediante bcrypt. |

---

# Autenticación

| Método | Endpoint  | Descripción                                |
| ------ | --------- | ------------------------------------------ |
| GET    | `/login`  | Muestra el formulario de inicio de sesión. |
| POST   | `/login`  | Valida las credenciales del administrador. |
| GET    | `/logout` | Finaliza la sesión del administrador.      |
