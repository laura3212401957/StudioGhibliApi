// Lógica para guardar/eliminar el favorito
function toggleFavorito(id, name) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const index = favoritos.findIndex(p => p.id === id);

    if (index > -1) {
        
        favoritos.splice(index, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert(`¡${name} eliminado de favoritos!`);
        
        
        if (typeof Home === 'function') {
            Home(); 
        }
        
    } else {
        
        favoritos.push({ id, name });
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert(`¡${name} añadido a favoritos!`);
        
    
        detalles(id); 
    }
}


// FUNCIÓN DETALLES PERSONAJE 
async function detalles(idPersonaje) {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const dataPersonaje = await fetch(`https://ghibliapi.vercel.app/people/${idPersonaje}`).then(res => res.json());

    let tituloPelicula = "Desconocida";
    if (dataPersonaje.films && dataPersonaje.films.length > 0) {
        const resPelicula = await fetch(dataPersonaje.films[0]);
        if (resPelicula.ok) {
            const dataPelicula = await resPelicula.json();
            tituloPelicula = `${dataPelicula.title} (${dataPelicula.release_date})`;
        }
    }

   
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const esFav = favoritos.some(p => p.id === dataPersonaje.id);
    const textoBoton = esFav ? "❤️ Quitar de Favoritos" : "🤍 Añadir a Favoritos";


    const detalle = `
        <section class="c-detalle">
            <h2>${dataPersonaje.name}</h2>
            <img src="https://placehold.co/120x180?text=${dataPersonaje.name.charAt(0)}" alt="${dataPersonaje.name}" height="180">
            <p>ID: ${dataPersonaje.id}</p>
            <p>Edad: ${dataPersonaje.age}</p>
            <p>Género: ${dataPersonaje.gender}</p>
            <p>Aparece en: ${tituloPelicula}</p>
            
            <button onClick="toggleFavorito('${dataPersonaje.id}', '${dataPersonaje.name}')">
                ${textoBoton}
            </button>
        </section>
    `;

    root.innerHTML = detalle;
}


async function detallesVehiculo(idVehiculo) {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const resVehiculo = await fetch(`https://ghibliapi.vercel.app/vehicles/${idVehiculo}`);
    const dataVehiculo = await resVehiculo.json();
    
    let nombrePiloto = "Desconocido";
    if (dataVehiculo.pilot) {
        const pilotoId = dataVehiculo.pilot.split('/').pop(); 
        const piloto = window.personajes.find(p => p.id === pilotoId); 
        if (piloto) {
            nombrePiloto = piloto.name;
        }
    }

    let tituloPelicula = "Desconocida";
    if (dataVehiculo.films && dataVehiculo.films.length > 0) {
        const resPelicula = await fetch(dataVehiculo.films[0]);
        if (resPelicula.ok) {
            const dataPelicula = await resPelicula.json();
            tituloPelicula = dataPelicula.title;
        }
    }
    
    const detalle = `
        <section class="c-detalle-vehiculo">
            <h2>${dataVehiculo.name}</h2>
            <p>Descripción: ${dataVehiculo.description}</p>
            <p>Clase: ${dataVehiculo.vehicle_class}</p>
            <p>Longitud: ${dataVehiculo.length}</p>
            <p>Piloto: ${nombrePiloto}</p>
            <p>Aparece en: ${tituloPelicula}</p>
        </section>
    `;

    root.innerHTML = detalle;
}