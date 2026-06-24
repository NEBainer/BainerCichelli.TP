# Mi App Imágenes

Aplicación web CRUD de productos con subida de imágenes, construida con **Node.js + Express + Prisma 7 + Multer + Supabase (PostgreSQL)**.

## Stack tecnológico

- **Runtime:** Node.js v24+ (ES Modules — `"type": "module"`)
- **Framework:** Express 4
- **ORM:** Prisma 7 (`prisma-client-js` con driver adapter)
- **Base de datos:** PostgreSQL en Supabase
- **Driver PostgreSQL:** `pg` + `@prisma/adapter-pg`
- **Subida de archivos:** Multer (almacenamiento local en `public/images/`)
- **Vistas:** EJS + Bootstrap 5
- **Variables de entorno:** dotenv

## Estructura del proyecto

```
mi-app-imagenes/
├── bin/
│   └── www.js                  # Entry point del servidor HTTP
├── config/
│   └── multer.js               # Configuración de Multer (diskStorage)
├── controllers/
│   └── productoControllers.js  # Lógica CRUD de productos
├── prisma/
│   ├── schema.prisma           # Modelo de datos Prisma
│   └── migrations/             # Historial de migraciones SQL
├── public/
│   └── images/                 # Imágenes subidas por Multer
├── routes/
│   ├── index.js                # Ruta raíz (/)
│   └── productos.js            # Rutas /productos/*
├── src/
│   └── lib/
│       └── prisma.js           # Instancia global de PrismaClient
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── productos/
│   │   ├── listar.ejs
│   │   ├── crear.ejs
│   │   └── editar.ejs
│   ├── index.ejs
│   └── error.ejs
├── app.js                      # Configuración Express
├── prisma.config.ts            # Configuración Prisma CLI
├── package.json
└── .env                        # Variables de entorno (NO subir al repo)
```

## Requisitos previos

- Node.js >= 20
- Una cuenta en [Supabase](https://supabase.com) con un proyecto PostgreSQL creado

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd mi-app-imagenes

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL de Supabase

# 4. Generar el cliente Prisma
npx prisma generate

# 5. Ejecutar migraciones
npx prisma migrate deploy

# 6. Iniciar la aplicación
npm run dev
```

## Variables de entorno

Crear un archivo `.env` en la raíz con:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?sslmode=require"
```

> ⚠️ **Importante:** Supabase requiere SSL. Asegúrate de que la URL incluya `?sslmode=require` o que el pool tenga `ssl: { rejectUnauthorized: false }`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia con nodemon (recarga automática) |
| `npm start` | Inicia en producción |
| `npx prisma generate` | Regenera el cliente Prisma tras cambios en schema |
| `npx prisma migrate dev` | Crea y aplica una nueva migración (desarrollo) |
| `npx prisma migrate deploy` | Aplica migraciones pendientes (producción) |
| `npx prisma studio` | Abre el panel visual de la base de datos |

## Rutas de la aplicación

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página de inicio |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/crear` | Formulario para crear producto |
| POST | `/productos/crear` | Guarda nuevo producto + imagen |
| GET | `/productos/editar/:id` | Formulario para editar producto |
| POST | `/productos/editar/:id` | Actualiza producto + imagen |
| POST | `/productos/eliminar/:id` | Elimina producto y su imagen |

## Errores comunes y soluciones

### `ECONNREFUSED` al conectar a Supabase
- **Causa:** `DATABASE_URL` es `undefined` o SSL no está habilitado.
- **Solución:** Verificar que `.env` existe y tiene la URL correcta. El `pg.Pool` en `src/lib/prisma.js` ya incluye `ssl: { rejectUnauthorized: false }`.

### `SyntaxError: @prisma/client does not provide an export named 'PrismaClient'`
- **Causa:** El schema usa `provider = "prisma-client"` (Prisma 7 nuevo generador TS).
- **Solución:** Usar `provider = "prisma-client-js"` en el schema y ejecutar `npx prisma generate`.

### `PrismaClientConstructorValidationError: Unknown property datasourceUrl`
- **Causa:** `prisma-client-js` no acepta `datasourceUrl` en el constructor — solo el nuevo generador TS lo acepta.
- **Solución:** Usar un `pg.Pool` con `@prisma/adapter-pg` en lugar de pasar la URL directamente.

### `Cannot find name 'process'` en TypeScript
- **Causa:** Falta `tsconfig.json` con `"types": ["node"]`.
- **Solución:** Asegurarse de que `tsconfig.json` existe con `"types": ["node"]` en `compilerOptions`.

### `title is not defined` en EJS
- **Causa:** `header.ejs` usa `<%= title %>` pero no todas las vistas pasan `title`.
- **Solución:** Usar `<%= typeof title !== 'undefined' ? title : 'Mi Tienda' %>` en `header.ejs`.

### Imagen no se muestra
- **Causa:** La carpeta `public/images/` no existe.
- **Solución:** Crear la carpeta manualmente: `mkdir -p public/images`

## Notas sobre Prisma 7 + ES Modules

Prisma 7 usa un motor WASM que **requiere un driver adapter** en lugar del motor binario tradicional:

```js
// src/lib/prisma.js
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
```

Y en `schema.prisma`:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}
```
