async function conexionEspecies() {
  const res = await fetch(`https://ghibliapi.vercel.app/species`);
  if (!res.ok) throw new Error("Fallo al conectar con la API de especies."); 
  const data = await res.json();
  return data;
}

function generarListaEspecies(array) {
  const contenedor = document.createElement("div");
  contenedor.classList.add("c-contenedor-lista");

  const h2 = document.createElement("h2");
  h2.textContent = "Catálogo de Especies de Studio Ghibli";
  contenedor.appendChild(h2);

  
  array.forEach(e => {
    const div = document.createElement("div");
    div.classList.add("c-lista-especie");
    div.innerHTML = `
      <h3>${e.name}</h3>
      <p>Clasificación: ${e.classification}</p>
      <p>Color de ojos: ${e.eye_colors || 'N/A'}</p>
      <p>Color de cabello: ${e.hair_colors || 'N/A'}</p>
    `;
    contenedor.appendChild(div);
  });

  return contenedor;
}

async function Informativa() {
  const root = document.getElementById("root");
  root.innerHTML = "Cargando...";
  
  try {
     
      const datosEspecies = await conexionEspecies(); 
      root.innerHTML = "";
      root.appendChild(generarListaEspecies(datosEspecies));
      
  } catch (error) {
      console.error(error);
      root.innerHTML = `<p style="color: red; text-align: center;">Error: No se pudo cargar el catálogo de especies.</p>`;
  }
}