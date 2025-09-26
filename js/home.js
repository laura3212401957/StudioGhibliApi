function Home(peliculas) {
    var root = document.getElementById("root");
    root.innerHTML = 'Home'; // se limpia el contenido previo
    
    for(var i = 0; i < peliculas.length; i++){
        var id = peliculas[i].id;
        var titulo = peliculas[i].title;
        // Aquí se define la variable 'imagen'
        var imagen = peliculas[i].image;
        
        root.innerHTML += `
            <div class="una-pelicula" onclick="detallesPelicula('${id}')">
                <p>${titulo}</p>
                <img src="${imagen}" width="auto" height="200" loading="lazy" alt="${titulo}">
            </div>
        `;
    } 
}