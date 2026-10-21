/**
 * 2. Middleware Global de Manejo de Errores
 * Se distingue en Express por tener exactamente cuatro parámetros:
 * (err, req, res, next).
 */
export function errorHandler(err, req, res, next) {
  console.error("🚨 [ERROR CAPTURADO EN LA API DE PELÍCULAS]:", err.message || err);

  if (res.headersSent) {
    return next(err);
  }

  const codigoEstado = err.statusCode || err.status || 500;
  const mensaje =
    codigoEstado >= 500
      ? "Error interno en el servidor de películas."
      : err.message || "La solicitud no pudo ser procesada.";

  res.status(codigoEstado).json({
    exito: false,
    error: {
      codigo: codigoEstado,
      mensaje
    }
  });
}