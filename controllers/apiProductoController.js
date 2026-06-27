import prisma from "../src/lib/prisma.js";

export const obtenerProductos = async (req, res) => {

  try {

    const {
      categoria
    } = req.query;
    console.log(req.query);

    const where = {
      activo: true
    };

    if (categoria) {
      where.categoria = categoria;
    }

    const productos = await prisma.producto.findMany({
      where,
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({
      ok: true,
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