function Favoritos() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Aseguramos la lectura del localStorage sea un array o un array vacío
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    root.innerHTML = "<p>No hay personajes favoritos</p>";
    return;
  }

  const contenedorLista = document.createElement("div");
  contenedorLista.classList.add("c-contenedor-lista"); 
  

  favoritos
    .filter(p => p && typeof p === 'object' && p.name) 
    .forEach(p => {
    
      const div = document.createElement("div");
      div.classList.add("c-lista-personaje");
      
      
      div.onclick = () => detalles(p.id); 

      const img = document.createElement("img");
      img.src = `https://placehold.co/60x60?text=${p.name.charAt(0)}`;
      img.alt = p.name;
      img.height = 60;
      img.loading = "lazy";

      const nombre = document.createElement("p");
      nombre.textContent = p.name;

      div.appendChild(img);
      div.appendChild(nombre);
      contenedorLista.appendChild(div);
    });

  root.appendChild(contenedorLista);
}