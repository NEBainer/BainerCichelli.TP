import express from 'express';
import {
  mostrarLogin,
  login,
  logout
} from '../controllers/authController.js';

const router = express.Router();

router.get('/login', mostrarLogin);
router.post('/login', login);
router.get('/logout', logout);

export default router;