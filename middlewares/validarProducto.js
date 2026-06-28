export const validarProducto = (req, res, next) => {

    const {
        nombre,
        categoria,
        marca,
        precio,
        stock
    } = req.body;

    if (
        !nombre ||
        !categoria ||
        !marca ||
        !precio ||
        !stock
    ) {
        return res.status(400).render("productos/crear", {
            title: "Nuevo Producto",
            error: "Todos los campos son obligatorios."
        });
    }

    next();

};