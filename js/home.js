// Archivo: js/home.js (Solución Final)

function generarLista(arrayPersonajes){
    const contenedorLista = document.createElement("div");

    contenedorLista.classList.add("c-contenedor-Lista");
    contenedorLista.id = "la-lista";
    
    // recorre el array de personajes
    for(let i = 0; i < arrayPersonajes.length; i++){
        const personaje = arrayPersonajes[i];
        const id = personaje.id; 
        const nombre = personaje.name;
        
        // contenedor principal del personaje
        const divPersonaje = document.createElement("div");
        divPersonaje.classList.add("una-persona");
        // Aseguramos que el clic llame al detalle del personaje
        divPersonaje.onclick = () => detallesPelicula(id); 

        // Imagen: Utilizamos el placeholder que te funciona
        const img = document.createElement("img");
        img.src = `https://placehold.co/60x60?text=${nombre}`;
        img.alt = nombre;
        img.height = 60; 
        img.width = 60;
        img.loading = "lazy";

        
        // Con la etiqueta p creamos el nombre del personaje
        const pNombre = document.createElement("p");
        // ¡SOLUCIÓN! Solo mostramos el nombre del personaje.
        pNombre.textContent = nombre; 
        
        
        divPersonaje.appendChild(pNombre);
        divPersonaje.appendChild(img);

        contenedorLista.appendChild(divPersonaje);
    }

    return contenedorLista;
} 

function Home() {
    document.getElementById("root").innerHTML ="";
    var root = document.getElementById("root");

    // Llama a la función generarLista 
    const contenedorLista = generarLista(personajes);

    root.appendChild(contenedorLista);
}