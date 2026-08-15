import express from "express";
import prisma from "../src/lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {

    const totalProductos =
        await prisma.producto.count();

    const productosActivos =
        await prisma.producto.count({
            where: {
                activo: true
            }
        });

    const productosSinStock =
        await prisma.producto.count({
            where: {
                activo: true,
                stock: 0
            }
        });

    const totalVentas =
        await prisma.venta.count();

    const ultimasVentas =
        await prisma.venta.findMany({
            orderBy: {
                fecha: "desc"
            },
            take: 5
        });

    res.render("index", {
        title: "Dashboard",
        totalProductos,
        productosActivos,
        productosSinStock,
        totalVentas,
        ultimasVentas
    });

});

export default router;