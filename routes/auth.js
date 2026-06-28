import express from 'express';
import {mostrarLogin,login,logout} from '../controllers/authController.js';
import { validarLogin } from "../middlewares/validarLogin.js";

const router = express.Router();

router.get('/login', mostrarLogin);
router.post('/login', validarLogin,login);
router.get('/logout', logout);

export default router;