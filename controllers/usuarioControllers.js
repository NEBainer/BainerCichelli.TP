import prisma from '../src/lib/prisma.js';
import bcrypt from 'bcrypt';

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    const usuarioExiste = await prisma.usuario.findUnique({
      where: {
        email
      }
    });

    if (usuarioExiste) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El email ya está registrado'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordHash
      }
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear usuario'
    });
  }
};