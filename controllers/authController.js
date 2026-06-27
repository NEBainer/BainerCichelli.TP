import prisma from '../src/lib/prisma.js';
import bcrypt from 'bcrypt';

export const mostrarLogin = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    error: null
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: {
        email
      }
    });

    if (!usuario) {
      return res.render('auth/login', {
        title: 'Login',
        error: 'Usuario o contraseña incorrectos'
      });
    }

    const coincide = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!coincide) {
      return res.render('auth/login', {
        title: 'Login',
        error: 'Usuario o contraseña incorrectos'
      });
    }

    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email
    };

    res.redirect('/productos');

  } catch (error) {
    console.error(error);

    res.render('auth/login', {
      title: 'Login',
      error: 'Error al iniciar sesión'
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};