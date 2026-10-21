import { Router } from "express";
import { peliculas } from "../data/peliculas.db.js";
import { crearPeliculaLimiter } from "../middlewares/rateLimiter.js";
import { validarPelicula } from "../middlewares/validator.js";

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

// 3. [POST] /api/peliculas - Crear una nueva película en el arreglo
router.post("/", crearPeliculaLimiter, validarPelicula, (req, res) => {
  if (peliculas.length >= MAXIMO_PELICULAS) {
    return res.status(409).json({
      exito: false,
      error: `El catálogo ya alcanzó el máximo de ${MAXIMO_PELICULAS} películas.`
    });
  }

  const { titulo, director, anio, duracionMinutos } = req.body;
  const nuevoId =
    peliculas.length > 0
      ? Math.max(...peliculas.map((pelicula) => pelicula.id)) + 1
      : 1;
  const nuevaPelicula = {
    id: nuevoId,
    titulo: titulo.trim(),
    director: director.trim(),
    anio: Number(anio),
    duracionMinutos: Number(duracionMinutos)
  };

  peliculas.push(nuevaPelicula);
  res.status(201).json({
    exito: true,
    mensaje: "Película agregada al catálogo en memoria.",
    pelicula: nuevaPelicula
  });
});

// 4. [PUT] /api/peliculas/:id - Actualizar una película existente
router.put("/:id", validarPelicula, (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);

  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }

  const indice = peliculas.findIndex((pelicula) => pelicula.id === idBuscado);
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede actualizar: no existe una película con ID ${idBuscado}.`
    });
  }

  const { titulo, director, anio, duracionMinutos } = req.body;
  peliculas[indice] = {
    id: idBuscado,
    titulo: titulo.trim(),
    director: director.trim(),
    anio: Number(anio),
    duracionMinutos: Number(duracionMinutos)
  };

  res.status(200).json({
    exito: true,
    mensaje: `Película con ID ${idBuscado} actualizada correctamente.`,
    pelicula: peliculas[indice]
  });
});

// 5. [DELETE] /api/peliculas/:id - Eliminar una película del arreglo
router.delete("/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);

  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }

  const indice = peliculas.findIndex((pelicula) => pelicula.id === idBuscado);
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede eliminar: no existe una película con ID ${idBuscado}.`
    });
  }

  const [peliculaEliminada] = peliculas.splice(indice, 1);
  res.status(200).json({
    exito: true,
    mensaje: `Película con ID ${idBuscado} eliminada del catálogo.`,
    pelicula: peliculaEliminada
  });
});

export default router;