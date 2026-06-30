import prisma from "../src/lib/prisma.js";

export const obtenerProductos = async (req, res) => {

  try {

    const {
    categoria,
    buscar,
    page
    } = req.query;

    const PRODUCTOS_POR_PAGINA = 6;

    const pagina = page ? parseInt(page) : null;

    const where = {
      activo: true
    };

    if (categoria) {
      where.categoria = categoria;
    }

    if (buscar) {
        where.nombre = {
            contains: buscar,
            mode: "insensitive"
        };
    }

    const opcionesConsulta = {
        where,
        orderBy: {
            createdAt: "desc"
        }
    };

    if (pagina) {
        opcionesConsulta.skip = (pagina - 1) * PRODUCTOS_POR_PAGINA;
        opcionesConsulta.take = PRODUCTOS_POR_PAGINA;
    }

    const productos = await prisma.producto.findMany(opcionesConsulta);

    const totalProductos = await prisma.producto.count({
        where
    });

    const totalPaginas = Math.ceil(
        totalProductos / PRODUCTOS_POR_PAGINA
    );

    res.json({
        ok: true,
        pagina: pagina || 1,
        totalPaginas: pagina
            ? totalPaginas
            : 1,
        totalProductos,
        cantidad: productos.length,
        productos
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      mensaje: "Error al obtener productos"
    });

  }

};

export const obtenerProductoPorId = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const producto = await prisma.producto.findFirst({
            where: {
                id,
                activo: true
            }
        });

        if (!producto) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            ok: true,
            producto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al obtener producto"
        });

    }

};