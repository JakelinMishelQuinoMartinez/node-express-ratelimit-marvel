/**
 * Base de Datos en Memoria: Catálogo de Películas de Marvel
 * --------------------------------------------------------
 * Los datos se almacenan en un arreglo mutable en memoria RAM.
 */
export let peliculas = [
  {
    id: 1,
    titulo: "Iron Man",
    director: "Jon Favreau",
    anio: 2008,
    duracionMinutos: 126
  },
  {
    id: 2,
    titulo: "The Avengers",
    director: "Joss Whedon",
    anio: 2012,
    duracionMinutos: 143
  },
  {
    id: 3,
    titulo: "Guardians of the Galaxy",
    director: "James Gunn",
    anio: 2014,
    duracionMinutos: 121
  },
  {
    id: 4,
    titulo: "Black Panther",
    director: "Ryan Coogler",
    anio: 2018,
    duracionMinutos: 134
  }
];

export function reiniciarPeliculas() {
  peliculas.length = 0;
  peliculas.push(
    {
      id: 1,
      titulo: "Iron Man",
      director: "Jon Favreau",
      anio: 2008,
      duracionMinutos: 126
    },
    {
      id: 2,
      titulo: "The Avengers",
      director: "Joss Whedon",
      anio: 2012,
      duracionMinutos: 143
    },
    {
      id: 3,
      titulo: "Guardians of the Galaxy",
      director: "James Gunn",
      anio: 2014,
      duracionMinutos: 121
    },
    {
      id: 4,
      titulo: "Black Panther",
      director: "Ryan Coogler",
      anio: 2018,
      duracionMinutos: 134
    }
  );
  return peliculas;
}