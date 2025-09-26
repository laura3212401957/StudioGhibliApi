   let peliculas = [];
    let totalPeliculas = 22; // Hay 22 películas en total en la API

// Conexión para obtener la lista de Peliculas
async function conexion() {
  const res = await fetch(`https://ghibliapi.vercel.app/films?limit=${totalPeliculas}`);
  const data = await res.json();
  return data;
}

// Cargar todos las peliculas al iniciar
async function General() {
  if (peliculas.length === 0) {
    peliculas = await conexion();
  }
  Home(peliculas);
  console.log(peliculas)
}

General();