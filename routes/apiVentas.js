import express from "express";
import {crearVenta,obtenerVentas,obtenerVentaPorId} from "../controllers/apiVentaController.js";
import { validarVenta } from "../middlewares/validarVenta.js";

const router = express.Router();

router.post("/", validarVenta, crearVenta);

router.get("/", obtenerVentas);

router.get("/:id", obtenerVentaPorId);

export default router;