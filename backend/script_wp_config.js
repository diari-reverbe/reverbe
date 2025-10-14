function limpiarCos(cos) {
  // 1. Elimina líneas que empiezan por >
  cos = cos.split('\n').filter(line => !line.trim().startsWith('>')).join('\n');

  // 2. Corta antes de marcas comunes de cita
  const cortes = ['On ', 'wrote:', 'central@mail.issim.net va escriure', '[centraleta-id:', 'Llista de correu'];
  for (const corte of cortes) {
    const index = cos.indexOf(corte);
    if (index !== -1) {
      cos = cos.slice(0, index).trim();
      break;
    }
  }

  return cos;
}

function mostrarAdjunt(adjunts) {
  const url = adjunts.trim();
  const extension = url.split('.').pop().toLowerCase();
  const esImagen = ['gif', 'jpg', 'jpeg', 'png', 'webp'].includes(extension);

  if (esImagen) {
    return `<img src="${url}" alt="Adjunt" style="max-width: 100%; margin-top: 0.5em;">`;
  }

  return `<a href="${url}" target="_blank">${url}</a>`;
}

const container = document.getElementById("missatges-container");

fetch("/wp-admin/admin-ajax.php?action=raio_api")
  .then(res => {
    if (!res.ok) throw new Error("Error al cargar datos: " + res.status);
    return res.json();
  })
  .then(data => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No hay mensajes para mostrar.</p>";
      return;
    }

    container.innerHTML = data
      .map((msg) => `
        <article class="missatge">
          <div class="assumpte">${msg.assumpte}</div>
          <div class="cos">${msg.cos}</div>
          <div class="data">${new Date(msg.data).toLocaleString()}</div>
          <div class="reverberacions">
            ${
              msg.reverberacions.length > 0
                ? msg.reverberacions
                    .map(
                      (rev) => `
              <div class="reverberacio">
                <h4>Reverberacions:</h4>
                <div class="rev-cos">${limpiarCos(rev.cos).replace(/\n/g, '<br>')}</div>
                <div class="rev-data">${new Date(rev.data).toLocaleString()}</div>
                ${
                  rev.adjunts
                    ? `<div class="rev-adjunts">
                        <strong>Adjunts:</strong><br>
                        ${mostrarAdjunt(rev.adjunts)}
                      </div>`
                    : ''
                }
              </div>
            `
                    )
                    .join('')
                : '<p></p>'
            }
          </div>
        </article>
      `)
      .join("");
  })
  .catch(error => {
    container.innerHTML = `<p class="error">❌ ${error.message}</p>`;
    console.error(error);
  });
