const container = document.getElementById("missatges-container");

fetch("", {
  headers: {
    "x-api-key": "" 
  }
})
  .then((res) => {
    if (!res.ok) throw new Error("Error al cargar datos: " + res.status);
    return res.json();
  })
  .then((data) => {
    if (data.length === 0) {
      container.innerHTML = "<p>No hay mensajes para mostrar.</p>";
      return;
    }

    container.innerHTML = data
      .map(
        (msg) => `
      <article class="missatge">
        <div class="assumpte">${msg.assumpte}</div>
        <div class="remitent">De: ${msg.remitent}</div>
        <div class="cos">${msg.cos}</div>
        <div class="data">${new Date(msg.data).toLocaleString()}</div>
      </article>
    `
      )
      .join("");
  })
  .catch((error) => {
    container.innerHTML = `<p class="error">❌ ${error.message}</p>`;
    console.error(error);
  });
