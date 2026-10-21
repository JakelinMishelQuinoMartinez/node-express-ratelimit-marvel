/**
 * Servidor Principal Express con Middleware express-rate-limit (ESM)
 * ------------------------------------------------------------------
 * API educativa para consultar un catálogo de películas de Marvel.
 */

import express from "express";
import { logger } from "./middlewares/logger.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

// 1. Instanciar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares Globales de Parseo y Auditoría
app.use(express.json());
app.use(logger);

// 3. Ruta Pública de Bienvenida (sin límite estricto de API)
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "🎬 Bienvenido a la API de Películas Marvel protegida con express-rate-limit",
    seguridad: "Middleware express-rate-limit activo en /api/ (Máx. 5 peticiones por minuto por IP)",
    almacenamiento: "Arreglo de películas en memoria RAM (sin base de datos externa)",
    limiteCatalogo: "Máximo de 5 películas en el catálogo.",
    endpoints: {
      listar_peliculas: "GET /api/peliculas",
      buscar_por_id: "GET /api/peliculas/:id",
      crear_pelicula: "POST /api/peliculas",
      actualizar_pelicula: "PUT /api/peliculas/:id",
      eliminar_pelicula: "DELETE /api/peliculas/:id"
    }
  });
});

// 4. Aplicar el limitador a todas las rutas que comiencen con '/api/'
app.use("/api/", apiLimiter);

// 5. Iniciar el servidor HTTP si no estamos en modo test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(`🎬 Servidor de Películas Marvel iniciado en http://localhost:${PORT}`);
    console.log(`🛡️  Rate Limit activo en /api/peliculas (Máx: 5 req / min)`);
    console.log(`=============================================================\n`);
  });
}

export default app;