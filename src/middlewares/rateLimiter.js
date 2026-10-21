import { rateLimit } from "express-rate-limit";

/**
 * 1. Limitador General para la API (/api/)
 * Permite un máximo de 5 solicitudes por minuto por dirección IP.
 */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto (60 segundos * 1000 milisegundos)
  limit: 5, // Máximo 5 solicitudes por ventana de 1 minuto
  statusCode: 429, // Código HTTP 429: Too Many Requests
  standardHeaders: "draft-7", // Agrega cabeceras estándar RateLimit
  legacyHeaders: true, // Agrega cabeceras X-RateLimit heredadas
  message: {
    exito: false,
    status: 429,
    error: "Demasiadas solicitudes desde esta IP. Intenta de nuevo en un minuto.",
    detalle: "Se permiten 5 solicitudes por minuto a la API."
  }
});

/**
 * 2. Limitador Estricto para la Creación de Películas
 * Permite un máximo de 3 creaciones por minuto por dirección IP.
 */
export const crearPeliculaLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  limit: 3, // Máximo 3 creaciones por minuto por IP
  statusCode: 429,
  standardHeaders: "draft-7",
  legacyHeaders: true,
  message: {
    exito: false,
    status: 429,
    error: "Se alcanzó el límite de creación de películas.",
    detalle: "Se permiten 3 solicitudes de creación por minuto."
  }
});