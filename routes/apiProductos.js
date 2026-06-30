import express from "express";
import {obtenerProductos, obtenerProductoPorId} from "../controllers/apiProductoController.js";

const router = express.Router();

router.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

export default router;