export const validarLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", {
            error: "Debe completar todos los campos."
        });
    }

    next();

};