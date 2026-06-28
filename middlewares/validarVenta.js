export const validarVenta = (req, res, next) => {

    const { cliente, productos } = req.body;

    if (!cliente) {
        return res.status(400).json({
            ok: false,
            mensaje: "Debe ingresar un cliente."
        });
    }

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({
            ok: false,
            mensaje: "Debe enviar al menos un producto."
        });
    }

    next();

};