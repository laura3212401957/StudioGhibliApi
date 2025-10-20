let peliculas = [];

async function conexionPeliculas() {
    const res = await fetch(`https://ghibliapi.vercel.app/films`);
    const data = await res.json();
    return data; 
}


function detallePelicula(film) {
    const root = document.getElementById("root");
    root.innerHTML = "";
    
   const detallesContainer = document.createElement("div");
    detallesContainer.classList.add("c-detalles-pelicula");
    detallesContainer.innerHTML = `
        <img src="${film.image}" alt="${film.title}" height="300">
        <h2>${film.title}</h2>
        <p><strong>Director:</strong> ${film.director}</p>
        <p><strong>Año:</strong> ${film.release_date}</p>
        <p><strong>Descripción:</strong> ${film.description}</p>
        <p><strong>Puntuación:</strong> ${film.rt_score}</p>
        <button onclick="Pelicula()">Volver a la lista</button>
    `;
    root.appendChild(detallesContainer);
}


//FUNCIÓN PARA GENERAR LA LISTA
function generarListaPeliculas(arrayPeliculas) {
    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista"); 

    arrayPeliculas.forEach(film => {
        const divPelicula = document.createElement("div");
        divPelicula.classList.add("c-lista-film", `film-${film.id}`);
   
        divPelicula.onclick = () => detallePelicula(film); 

   
        const img = document.createElement("img");
        img.src = film.image;
        img.alt = film.title;
        img.height = 200;
        img.loading = "lazy";

        const h3Title = document.createElement("h3");
        h3Title.textContent = film.title;
        
        
        divPelicula.appendChild(img);
        divPelicula.appendChild(h3Title);
        
        contenedorLista.appendChild(divPelicula);
    });

    return contenedorLista; 
}


async function Pelicula() {
    const root = document.getElementById("root");
    root.innerHTML = "";
    
    if (peliculas.length === 0) {
        root.textContent = "Cargando películas...";
        peliculas = await conexionPeliculas();
    }
    
    const contenedorLista = generarListaPeliculas(peliculas);
    root.innerHTML = ""; 
    root.appendChild(contenedorLista);
}