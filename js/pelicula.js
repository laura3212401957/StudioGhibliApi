// Archivo: js/pelicula.js

let peliculas = [];

async function conexionPeliculas() {
  const res = await fetch(`https://ghibliapi.vercel.app/films`);
  const data = await res.json();
  return data; 
}

// Función auxiliar para generar la lista (SOLO DOM)
function generarListaPeliculas(arrayPeliculas) {
    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista"); 

    for (let i = 0; i < arrayPeliculas.length; i++) {
        const film = arrayPeliculas[i];
        const id = film.id; 
        const title = film.title;
        
        const image = film.image; 
        const director = film.director;
        const release_date = film.release_date;
        
        const divPelicula = document.createElement("div");
        divPelicula.classList.add("c-lista-film", `film-${id}`);
        // Nota: Si quieres el detalle de la película, deberías crear una función 
        // y asignarla aquí: divPelicula.onclick = () => detallesPelicula(id);

        // 🖼️ Imagen
        const img = document.createElement("img");
        img.src = image; // Usamos la URL del póster de la API
        img.alt = title;
        img.height = 200;
        img.loading = "lazy";

        // 🏷️ Título
        const h3Title = document.createElement("h3");
        h3Title.textContent = title;
        
        // 🧑 Director
        const pDirector = document.createElement("p");
        pDirector.textContent = `Director: ${director}`;

        // 🗓️ Fecha de Estreno
        const pFecha = document.createElement("p");
        pFecha.textContent = `Año: ${release_date}`;
        
        // Ensamblaje (SOLO DOM)
        divPelicula.appendChild(img);
        divPelicula.appendChild(h3Title);
        divPelicula.appendChild(pDirector);
        divPelicula.appendChild(pFecha);
        
        contenedorLista.appendChild(divPelicula);
    }

    return contenedorLista; 
}


async function Pelicula() {
    document.getElementById("root").innerHTML = "";
    var root = document.getElementById("root");

    if (peliculas.length === 0) {
        root.textContent = "Cargando películas...";
        peliculas = await conexionPeliculas();
    }
    
    const contenedorLista = generarListaPeliculas(peliculas);
    root.innerHTML = ""; 
    root.appendChild(contenedorLista);
}