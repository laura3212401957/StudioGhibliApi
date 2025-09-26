async function detallesPelicula(parametro){
    var root = document.getElementById("root");
    const res = await fetch(`https://ghibliapi.vercel.app/people/${parametro}`);
    const data = await res.json();

    const detallesPelicula = `
    <section class="c-detallesPelicula">
        <img src="https://raw.githubusercontent.com/laura3212401957/StudioGhibliApi/main/assets/${data.id}.jpg" alt="${data.name}" height="120" width="1200">
        <p>${data.name}</p>
        <p>${data.id}</p>
        <p>Edad: ${data.age}</p>
        <p>Género: ${data.gender}</p>
        <p>Color de ojos: ${data.eye_color}</p>
        <p>Color de cabello: ${data.hair_color}</p>
    </section>
    `;

    root.innerHTML = detallesPelicula;
}

