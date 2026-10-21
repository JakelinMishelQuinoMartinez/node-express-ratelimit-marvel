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

// 2. [GET] /api/peliculas/:id - Buscar una película por su ID
router.get("/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);

  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }

  const peliculaEncontrada = peliculas.find((pelicula) => pelicula.id === idBuscado);
  if (!peliculaEncontrada) {
    return res.status(404).json({
      exito: false,
      error: `No se encontró una película con el ID ${idBuscado}.`
    });
  }

  res.status(200).json({
    exito: true,
    mensaje: "Película encontrada.",
    pelicula: peliculaEncontrada
  });
});

export default router;