// Variable para guardar el array 
let arrayPersonajesVisible = []; 

function generarHeader() {
    const header = document.createElement('header');
    header.id = 'main-header'; 

    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-container');
    
    const title = document.createElement('h1');
    title.textContent = 'STUDIO GHIBLI';
    
    logoContainer.appendChild(title);
    header.appendChild(logoContainer);
    document.body.prepend(header);
}


function generarLista(arrayPersonajes) {
    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista");
    contenedorLista.id = "la-lista";

    arrayPersonajes.forEach(personaje => {
        const id = personaje.id;
        const nombre = personaje.name;
        
        const divPersonaje = document.createElement("div");
        divPersonaje.classList.add("c-lista-personaje", `persona-${id}`);
      
        divPersonaje.onclick = () => detalles(id); 

        const pNombre = document.createElement("p");
        pNombre.textContent = nombre;

        const img = document.createElement("img");
        img.src = `https://placehold.co/60x60?text=${nombre.charAt(0)}`; 
        img.width = 60;
        img.height = 60;
        img.loading = "lazy";
        img.alt = nombre;
        
        divPersonaje.appendChild(pNombre);
        divPersonaje.appendChild(img);
        contenedorLista.appendChild(divPersonaje);
    });
    return contenedorLista;
}

// Buscador
function buscadorfuncion(sza) {
    const root = document.getElementById("root");
    const listaExistente = document.getElementById("la-lista");
    if (listaExistente) listaExistente.remove();

    const arrayBase = arrayPersonajesVisible; 

    const arrayParaMostrar = sza.length >= 3
        ? arrayBase.filter(personaje => personaje.name.toLowerCase().includes(sza.toLowerCase()))
        : arrayBase;

    const nuevoContenedorLista = generarLista(arrayParaMostrar);
    root.appendChild(nuevoContenedorLista);
}

// Home principal: Acepta un array opcional (dataArray) para mostrar el filtro
function Home(dataArray) {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const arrayFinal = dataArray || window.personajes || []; 
    arrayPersonajesVisible = arrayFinal; 

    // Buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar personaje...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    // Contenedor de filtros
    const tipos = ["All", "Human", "Spirit", "Dragon", "Cat"]; 
    const contenedorFiltro = document.createElement("div");
    contenedorFiltro.classList.add("tipos-container");

    tipos.forEach(tipo => {
        const btn = document.createElement("button");
        btn.textContent = tipo;
        btn.addEventListener("click", () => {
            FiltroConexion(tipo); 
        });
        contenedorFiltro.appendChild(btn);
    });

    // Contenedor lista
    const contenedorLista = generarLista(arrayFinal);

    
    root.appendChild(buscador);
    root.appendChild(contenedorFiltro);
    root.appendChild(contenedorLista);
}