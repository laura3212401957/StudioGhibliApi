// Archivo: js/conexion.js (Corregido: Devuelve datos y llama a Home correctamente)

let personajes = [];
let totalPersonajes = 50; 

// Conexión para obtener la lista de personajes
async function conexion() {
  const res = await fetch(`https://ghibliapi.vercel.app/people?limit=${totalPersonajes}`);
  const data = await res.json();
  
  // ¡CORRECCIÓN CRÍTICA! La API de Ghibli devuelve el array directamente.
  // data.results es incorrecto para este endpoint.
  return data; 
}

// Cargar todos los personajes al iniciar
async function General() {
  if (personajes.length === 0) {
    personajes = await conexion();
  }
  
  // CORRECCIÓN: Llamamos a Home() sin argumentos, ya que Home usa la variable global 'personajes'.
  Home(); 
}

General()