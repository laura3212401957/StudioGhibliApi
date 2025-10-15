async function detallesPelicula(idPersonaje){ // Usamos 'detallesPelicula' para que funcione con 'home.js'
    
    const root = document.getElementById("root");
    root.innerHTML =""; // Limpiamos la vista anterior

    // 1. Obtener los detalles del personaje
    const resPersonaje = await fetch(`https://ghibliapi.vercel.app/people/${idPersonaje}`);
    const dataPersonaje = await resPersonaje.json();
    
    // --- Comienza la creación de NODOS DOM (SIN HTML en strings) ---
    
    const sectionDetalle = document.createElement("section");
    sectionDetalle.classList.add("c-detalle");

    // Imagen (Placeholder o ruta)
    const img = document.createElement("img");
    // Usamos tu ruta local, aunque podría no funcionar sin las imágenes
    img.src = `https://raw.githubusercontent.com/laura3212401957/StudioGhibliApi/main/assets/${dataPersonaje.id}.jpg`; 
    img.alt = dataPersonaje.name;
    img.height = 120;
    img.width = "auto";
    sectionDetalle.appendChild(img);

    const h2Nombre = document.createElement("h2");
    h2Nombre.textContent = dataPersonaje.name;
    sectionDetalle.appendChild(h2Nombre);

    // Información del personaje (ID, edad, género, etc.)
    const datos = [
        `ID: ${dataPersonaje.id}`,
        `Edad: ${dataPersonaje.age}`,
        `Género: ${dataPersonaje.gender}`,
        `Color de Ojos: ${dataPersonaje.eye_color}`,
        `Color de Cabello: ${dataPersonaje.hair_color}`
    ];
    datos.forEach(texto => {
        const p = document.createElement("p");
        p.textContent = texto;
        sectionDetalle.appendChild(p);
    });

    // Título de Películas
    const h3Peliculas = document.createElement("h3");
    h3Peliculas.textContent = "Aparece en las Películas:";
    sectionDetalle.appendChild(h3Peliculas);

    // 2. Lógica para mostrar la lista de películas
    const ulPeliculas = document.createElement("ul");
    
    for (const filmUrl of dataPersonaje.films) {
        // Hacemos una llamada a la API por cada URL para obtener el título
        const resPelicula = await fetch(filmUrl);
        const dataPelicula = await resPelicula.json();
        
        const li = document.createElement("li");
        li.textContent = `${dataPelicula.title} (${dataPelicula.release_date})`;
        ulPeliculas.appendChild(li);
    }
    sectionDetalle.appendChild(ulPeliculas);

    // 3. Añadir toda la sección al root
    root.appendChild(sectionDetalle);
}