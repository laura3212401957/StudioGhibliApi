let personajes = [];
let totalPersonajes = 50; 

async function fetchGhibli(endpoint) {
    const url = `https://ghibliapi.vercel.app/${endpoint}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fallo en la conexión a ${endpoint}: ${res.status}`);
    return res.json();
}

//Carga todos los personajes o filtra por especie
async function conexion(filtro = "All") {
    const LowerCase = filtro.toLowerCase();

    if (filtro === "All") {
        return fetchGhibli(`people?limit=${totalPersonajes}`);
    }

    // Filtro por Especie
    try {
        const allSpec = await fetchGhibli(`species`);
        const match = allSpec.find(s => (s.name || "").toLowerCase() === LowerCase);
        
        if (match && Array.isArray(match.people) && match.people.length > 0) {
            // Carga los detalles de los personajes de esa especie
            const personasPromises = match.people.map(url =>
                fetch(url).then(res => res.json())
            );
            // Solo devuelve resultados válidos (evita errores 404 de la API)
            const resultados = await Promise.allSettled(personasPromises);
            return resultados
                .filter(r => r.status === 'fulfilled' && r.value.name)
                .map(r => r.value);
        }
    } catch (err) {
        console.warn(`Advertencia: Falló la búsqueda por especie (${filtro}).`, err);
    }

    return [];
}


async function General() {

    if (typeof generarHeader === "function") {
        generarHeader(); 
    }
    
    
    if (personajes.length === 0) {
        try {
            const dataPersonajes = await conexion(); 
            personajes = dataPersonajes;
        } catch (err) {
            console.error("Error cargando datos iniciales:", err);
            
            if (typeof Home === "function") {
                Home([]); 
            }
            
            return; 
        }
    } 
    
    // Renderiza la página principal 
    if (typeof Home === "function") {
        Home();
    }
}

// FUNCIÓN DE FILTRO: Maneja el evento click de los botones
async function FiltroConexion(Elfiltro) {
    const root = document.getElementById("root");
    if (root) root.innerHTML = '<p style="text-align:center; padding: 20px;">Cargando...</p>';

    try {
        const personajesFiltrados = await conexion(Elfiltro); 
        
        if (typeof Home === "function") {
            Home(personajesFiltrados); 
        }

    } catch (err) {
        console.error("Error en FiltroConexion:", err);
        if (root) root.innerHTML = '<p style="text-align:center; padding: 20px; color: red;">Error al aplicar el filtro.</p>';
    }
}

// Inicia la aplicación al cargar el script
General();