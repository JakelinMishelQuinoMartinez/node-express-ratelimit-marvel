import { Router } from "express";
import { peliculas } from "../data/peliculas.db.js";

/**
 * Enrutador Modular de Películas (express.Router)
 * ------------------------------------------------
 * Gestiona los endpoints CRUD operando sobre el arreglo en memoria.
 */
const router = Router();
const MAXIMO_PELICULAS = 5;

// 1. [GET] /api/peliculas - Listar todas las películas del arreglo
router.get("/", (req, res) => {
  res.status(200).json({
    exito: true,
    total: peliculas.length,
    maximo: MAXIMO_PELICULAS,
    rateLimitInfo: req.rateLimit
      ? {
          limiteVentana: req.rateLimit.limit,
          usados: req.rateLimit.current,
          tokensRestantes: req.rateLimit.remaining
        }
      : undefined,
    datos: peliculas
  });
});

export default router;