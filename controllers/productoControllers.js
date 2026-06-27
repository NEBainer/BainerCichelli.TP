import prisma from '../src/lib/prisma.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const listarProductos = async (req, res) => {
    try {
        const productos = await prisma.producto.findMany({
            orderBy: {createdAt: 'desc'}
        });
        res.render('productos/listar', {
            title: 'Lista de Productos',
            productos: productos
        });
    }catch (error){
        console.error('Error al listar productos: ', error);
        res.status(500).render('error', {message: 'Error al cargar productos'});
    }
};

export const mostrarFormCrear = (req, res) => {
    res.render('productos/crear', {
        title: 'Nuevo Producto',
        error: null
    });
}

export const crearProducto = async (req, res) => {
    try {
        const {nombre, descripcion, precio } = req.body;

        if(!nombre || !precio){
            return res.render('productos/crear', {
                title: 'Nuevo Producto',
                error: 'Nombre y Precio son obligatorios'
            })
        }

        const imagen = req.file ? req.file.filename : null;

        await prisma.producto.create({
            data: {
                nombre,
                descripcion: descripcion || null,
                precio: parseFloat(precio),
                imagen
            }
        });

        res.redirect('/productos');
    }catch (error){
        console.error('error al crear el producto: ', error);
        res.render('productos/crear',{
            title: 'Nuevo Producto',
            error: 'Error al Guardar el producto'
        })
    }
};

export const mostrarFormEditar = async (req, res) => {
    try{
        const producto = await prisma.producto.findUnique({
            where : {id: parseInt(req.params.id)}
        });

        if (!producto){
            return res.status(404).render('error', {message: 'Producto no encontrado'});
        }

        res.render('productos/editar',{
            title: 'editar Producto',
            producto : producto,
            error: null
        });
    }catch(error){
        console.error('Error al buscar producto: ', error);
        res.status(500).render('error', {message: 'Error al cargar el producto'});
    }
};

export const actualizarProducto = async (req, res) =>{
    try{
        const {nombre, descripcion, precio } = req.body;
        const id = parseInt(req.params.id);
        const productoActual = await prisma.producto.findUnique({
            where: {id}
        });

        let imagen = productoActual.imagen;

        if(req.file){
            if(productoActual.imagen){
                const rutaAnterior = path.join(__dirname, '../public/images', productoActual.imagen);
                if(fs.existsSync(rutaAnterior)){
                    fs.unlinkSync(rutaAnterior);
                }
            }
            imagen = req.file.filename;
        }

        await prisma.producto.update({
            where: {id},
            data: {
                nombre,
                descripcion: descripcion || null,
                precio: parseFloat(precio),
                imagen
            }
        });

        res.redirect('/productos');

    }catch(error){
        console.error('Error al actulizar el producto: ', error);
        res.status(500).render('error', {message: 'Error al actulizar el producto'})
    }
};

export const eliminarProducto = async (req, res) =>{
    try{
        const id = parseInt(req.params.id);
        const producto = await prisma.producto.findUnique({
            where : {id}
        });

        if(producto && producto.imagen){
            const rutaImagen = path.join(__dirname, '../public/images', producto.imagen);
            if (fs.existsSync(rutaImagen)){
                fs.unlinkSync(rutaImagen);
            }
        }

        await prisma.producto.delete({
            where: {id}
        });

        res.redirect('/productos');
    }catch(error){
        console.error('Error al eliminar producto: ', error);
        res.status(500).render('error', {message: 'Error al eliminar el producto'});
    }
}

