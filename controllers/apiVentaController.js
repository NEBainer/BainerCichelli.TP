import prisma from "../src/lib/prisma.js";

export const crearVenta = async (req, res) => {

    try {

        const { cliente, productos } = req.body;

        if (!cliente || !productos || productos.length === 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "Debe indicar un cliente y al menos un producto."
            });
        }

        // Buscar los productos solicitados
        const productosBD = await prisma.producto.findMany({
            where: {
                id: {
                    in: productos.map(producto => producto.id)
                },
                activo: true
            }
        });

        // Verificar que existan
        if (productosBD.length !== productos.length) {
            return res.status(404).json({
                ok: false,
                mensaje: "Uno o más productos no existen."
            });
        }

        // Verificar stock
        for (const item of productos) {

            const productoBD = productosBD.find(
                producto => producto.id === item.id
            );

            if (productoBD.stock < item.cantidad) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Stock insuficiente para ${productoBD.nombre}`
                });
            }

        }

        // Calcular total
        let total = 0;

        for (const item of productos) {

            const productoBD = productosBD.find(
                producto => producto.id === item.id
            );

            total += productoBD.precio * item.cantidad;

        }

        // Transacción
        const venta = await prisma.$transaction(async (tx) => {

            // Crear la venta
            const nuevaVenta = await tx.venta.create({
                data: {
                    cliente,
                    total
                }
            });

            // Crear detalle de venta
            for (const item of productos) {

                await tx.ventaProducto.create({
                    data: {
                        ventaId: nuevaVenta.id,
                        productoId: item.id,
                        cantidad: item.cantidad
                    }
                });

            }

            // Descontar stock
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

        });

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
            where: {
                id
            },
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