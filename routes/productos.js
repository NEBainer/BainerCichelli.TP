import express from 'express';
import { listarProductos, mostrarFormCrear, crearProducto, mostrarFormEditar, actualizarProducto, eliminarProducto, activarProducto } from '../controllers/productoControllers.js';
import upload from '../config/multer.js';
import { verificarSesion } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verificarSesion);

router.get('/', listarProductos);

router.get('/crear', mostrarFormCrear);
router.post('/crear', upload.single('imagen'), crearProducto);

router.get('/editar/:id', mostrarFormEditar);
router.post('/editar/:id', upload.single('imagen'), actualizarProducto);

router.post('/eliminar/:id', eliminarProducto);
router.post('/activar/:id', activarProducto);

export default router;
