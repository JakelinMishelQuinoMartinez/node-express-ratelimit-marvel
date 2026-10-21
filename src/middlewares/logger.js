/**
 * 1. Middleware de Registro y Auditoría de Tráfico
 */
export function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const metodo = req.method;
  const url = req.originalUrl || req.url;

  console.log(`[${timestamp}] 🎬 ${metodo} -> ${url}`);

  // Obligatorio invocar next() para continuar hacia el siguiente middleware
  next();
}
