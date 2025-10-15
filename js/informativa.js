// Archivo: js/informativa.js

let especies = [];

// 1. Conexión específica para el endpoint de Especies
async function conexionEspecies() {
    const res = await fetch(`https://ghibliapi.vercel.app/species`);
    const data = await res.json();
    return data; 
}

// 2. Función auxiliar para generar la lista (SOLO DOM)
function generarListaEspecies(arrayEspecies) {
    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista");
    
    // Título de la sección
    const h2Titulo = document.createElement("h2");
    h2Titulo.textContent = "Catálogo de Especies de Studio Ghibli";
    contenedorLista.appendChild(h2Titulo);

    for (let i = 0; i < arrayEspecies.length; i++) {
        const especie = arrayEspecies[i];
        const name = especie.name;
        const classification = especie.classification;
        const eye_color = especie.eye_color;
        const hair_color = especie.hair_color;
        
        // Contenedor de cada especie
        const divEspecie = document.createElement("div");
        divEspecie.classList.add("c-lista-especie"); 

        // 🏷️ Nombre
        const h3Name = document.createElement("h3");
        h3Name.textContent = name;
        
        // 🧬 Clasificación
        const pClasificacion = document.createElement("p");
        pClasificacion.textContent = `Clasificación: ${classification}`;

        // 👁️ Color de Ojos
        const pEyeColor = document.createElement("p");
        pEyeColor.textContent = `Color de Ojos: ${eye_color}`;
        
        // 💇 Color de Cabello
        const pHairColor = document.createElement("p");
        pHairColor.textContent = `Color de Cabello: ${hair_color}`;

        // Ensamblaje
        divEspecie.appendChild(h3Name);
        divEspecie.appendChild(pClasificacion);
        divEspecie.appendChild(pEyeColor);
        divEspecie.appendChild(pHairColor);
        
        contenedorLista.appendChild(divEspecie);
    }

    return contenedorLista; 
}


// 3. Función principal Informativa() (llamada desde index.html)
async function Informativa() {
    document.getElementById("root").innerHTML = "";
    var root = document.getElementById("root");

    // Cargar las especies si no están en la memoria
    if (especies.length === 0) {
        root.textContent = "Cargando catálogo de especies...";
        especies = await conexionEspecies();
    }
    
    // Mostrar la lista
    const contenedorLista = generarListaEspecies(especies);
    root.innerHTML = ""; // Limpiamos el mensaje de carga
    root.appendChild(contenedorLista);
}