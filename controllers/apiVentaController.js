import prisma from "../src/lib/prisma.js";

export const crearVenta = async (req, res) => {

    try {

        const { cliente, productos } = req.body;

        const productosBD = await prisma.producto.findMany({
            where: {
                id: {
                    in: productos.map(producto => producto.id)
                },
                activo: true
            }
        });

        if (productosBD.length !== productos.length) {
            return res.status(404).json({
                ok: false,
                mensaje: "Uno o más productos no existen."
            });
        }

        // Crear mapa para búsquedas rápidas
        const productosMap = new Map(
            productosBD.map(producto => [producto.id, producto])
        );

        let total = 0;

        for (const item of productos) {

            const productoBD = productosMap.get(item.id);

            if (productoBD.stock < item.cantidad) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Stock insuficiente para ${productoBD.nombre}`
                });
            }

            total += productoBD.precio * item.cantidad;

        }

        const venta = await prisma.$transaction(
            async (tx) => {

                const nuevaVenta = await tx.venta.create({
                    data: {
                        cliente,
                        total
                    }
                });

                // Crear todos los detalles de una sola vez
                await tx.ventaProducto.createMany({
                    data: productos.map(item => ({
                        ventaId: nuevaVenta.id,
                        productoId: item.id,
                        cantidad: item.cantidad
                    }))
                });

                // Actualizar stock
                for (const item of productos) {

                    await tx.producto.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            stock: {
                                decrement: item.cantidad
                            }
                        }
                    });

                }

                return nuevaVenta;

            },
            {
                timeout: 20000
            }
        );

        res.status(201).json({
            ok: true,
            mensaje: "Venta registrada correctamente.",
            venta
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al registrar la venta."
        });

    }

};

export const obtenerVentas = async (req, res) => {

    try {

        const ventas = await prisma.venta.findMany({
            include: {
                productos: {
                    include: {
                        producto: true
                    }
                }
            },
            orderBy: {
                fecha: "desc"
            }
        });

        res.json({
            ok: true,
            cantidad: ventas.length,
            ventas
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al obtener las ventas."
        });

    }

};

export const obtenerVentaPorId = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const venta = await prisma.venta.findUnique({
            where: { id },
            include: {
                productos: {
                    include: {
                        producto: true
                    }
                }
            }
        });

        if (!venta) {
            return res.status(404).json({
                ok: false,
                mensaje: "Venta no encontrada."
            });
        }

        res.json({
            ok: true,
            venta
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al obtener la venta."
        });

    }

};