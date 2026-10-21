# API REST: catálogo de películas de Marvel

## Resumen

Este proyecto implementa una API REST con Node.js y Express para consultar y
administrar un catálogo en memoria de películas asociadas al Universo
Cinematográfico de Marvel (MCU). El ejercicio aplica separación por capas,
operaciones CRUD, validación de datos, registro de solicitudes y limitación de
frecuencia. El catálogo incluye cinco títulos de ejemplo y la API no permite
superar un máximo de cinco películas.

**Palabras clave:** API REST, Express, middleware, CRUD, validación, control de
frecuencia.

## 1. Introducción

Una API REST permite intercambiar recursos mediante HTTP y representar las
operaciones habituales con métodos como `GET`, `POST`, `PUT` y `DELETE`. Este
ejercicio toma como dominio un catálogo de películas para ilustrar el diseño
modular de una aplicación Express. La implementación es didáctica: utiliza
almacenamiento en memoria, por lo que no sustituye a una base de datos ni a un
servicio de producción.

La aplicación y sus módulos se organizan directamente en `src/`.

## 2. Objetivos

### Objetivo general

Desarrollar una API REST modular para practicar el manejo de recursos,
validación de entradas y middleware en Express.

### Objetivos específicos

- Organizar aplicación, rutas, datos y middleware en módulos separados.
- Implementar las cinco operaciones de consulta y modificación del catálogo.
- Validar la forma y el contenido de los datos recibidos.
- Aplicar límites de solicitudes generales y para la creación de registros.
- Documentar la ejecución, los endpoints y las limitaciones del prototipo.

## 3. Tecnologías y requisitos

- Node.js con soporte para ECMAScript Modules.
- Express 4.
- `express-rate-limit`.
- npm.

Las dependencias ya están declaradas en `package.json`. En una instalación
nueva, se pueden instalar con:

```bash
npm install
```

## 4. Organización del proyecto

```text
src/
├── app.js
├── data/
│   └── peliculas.db.js
├── middlewares/
│   ├── errorHandler.js
│   ├── logger.js
│   ├── rateLimiter.js
│   └── validator.js
└── routes/
    └── peliculas.routes.js
```

`app.js` configura el servidor HTTP; `routes/` define los endpoints; `data/`
contiene el catálogo en memoria; `middlewares/` agrupa validación, registro,
limitación de frecuencia y manejo de errores.

## 5. Diseño e implementación

### 5.1 Modelo de datos

Cada película se representa con los campos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | Entero | Asignado por la API; identificador único del registro |
| `titulo` | Texto | Obligatorio, no vacío |
| `director` | Texto | Obligatorio, no vacío |
| `anio` | Entero | Entre 1888 y el año actual |
| `duracionMinutos` | Entero | Mayor que cero |

Los cinco registros iniciales son datos ilustrativos. Se conservan en un
arreglo JavaScript, no en una base de datos persistente.

### 5.2 Rutas

La URL base es `http://localhost:3000/api/peliculas`.

| Método | Ruta | Resultado |
|---|---|---|
| `GET` | `/api/peliculas` | Devuelve el catálogo y sus límites |
| `GET` | `/api/peliculas/:id` | Consulta una película por identificador |
| `POST` | `/api/peliculas` | Agrega una película si los datos son válidos y hay espacio |
| `PUT` | `/api/peliculas/:id` | Reemplaza los datos de una película existente |
| `DELETE` | `/api/peliculas/:id` | Elimina una película existente |

Ejemplo de cuerpo para `POST` y `PUT`:

```json
{
   "titulo": "Avengers: Endgame",
   "director": "Anthony y Joe Russo",
   "anio": 2019,
   "duracionMinutos": 181
}
```

Las respuestas usan JSON. La API devuelve `400` ante identificadores o cuerpos
inválidos, `404` cuando no existe el registro solicitado, `409` cuando se
intenta rebasar el catálogo máximo y `429` al exceder un límite de solicitudes.

### 5.3 Middleware y control de solicitudes

- `logger.js` registra fecha, método y URL de cada petición.
- `validator.js` valida los campos requeridos en las operaciones de escritura.
- `rateLimiter.js` configura un máximo general de cinco solicitudes por minuto
  por IP y un límite adicional de tres intentos de creación por minuto.
- `errorHandler.js` centraliza errores no atendidos por las rutas.

El orden de montaje es relevante: primero se procesan JSON y el logger; luego
se aplica el limitador a `/api/`; al final se atienden rutas inexistentes y
errores.

## 6. Instalación y ejecución

Desde la raíz del proyecto:

```bash
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`. Para desarrollo con
reinicio al detectar cambios:

```bash
npm run dev
```

## 7. Limitaciones y consideraciones

1. **Persistencia:** al reiniciar el proceso, el catálogo vuelve a sus cinco
   datos iniciales; las modificaciones no se guardan.
2. **Escalabilidad:** el almacenamiento y el limitador en memoria no se
   comparten entre procesos o servidores.
3. **Seguridad:** la limitación de frecuencia es una medida básica y no
   reemplaza autenticación, autorización, monitoreo ni controles de producción.
4. **Alcance temático:** los títulos se usan únicamente como datos de ejemplo;
   el proyecto no está afiliado ni patrocinado por Marvel.
