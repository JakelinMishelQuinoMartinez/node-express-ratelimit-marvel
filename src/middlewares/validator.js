/**
 * Middleware de Validación de Películas
 * -------------------------------------
 * Verifica los campos obligatorios enviados en las solicitudes POST y PUT.
 */
export function validarPelicula(req, res, next) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      exito: false,
      error: "Se requiere enviar un objeto JSON válido."
    });
  }

  const { titulo, director, anio, duracionMinutos } = req.body;

  if (typeof titulo !== "string" || titulo.trim().length === 0) {
    return res.status(400).json({
      exito: false,
      error: "El campo 'titulo' es obligatorio y debe ser texto."
    });
  }

  if (typeof director !== "string" || director.trim().length === 0) {
    return res.status(400).json({
      exito: false,
      error: "El campo 'director' es obligatorio y debe ser texto."
    });
  }

  const anioNum = Number(anio);
  if (
    anio === undefined ||
    anio === null ||
    isNaN(anioNum) ||
    !Number.isInteger(anioNum) ||
    anioNum < 1888 ||
    anioNum > new Date().getFullYear()
  ) {
    return res.status(400).json({
      exito: false,
      error: "El campo 'anio' debe ser un año entero válido."
    });
  }

  const duracionNum = Number(duracionMinutos);
  if (
    duracionMinutos === undefined ||
    duracionMinutos === null ||
    isNaN(duracionNum) ||
    !Number.isInteger(duracionNum) ||
    duracionNum < 1
  ) {
    return res.status(400).json({
      exito: false,
      error: "El campo 'duracionMinutos' debe ser un entero mayor que cero."
    });
  }

  // Si todos los datos son válidos, continuamos al controlador
  next();
}
