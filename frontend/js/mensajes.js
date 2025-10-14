const API_URL = "";
const API_KEY = "";

// Opciones del panel de control
export const opciones = {
    orden: "cronologico",
    mostrarAutores: true,
    estiloVisual: "soft",
    composicion: "scroll",
    blindscroll: false,
    filtrosDia: [],
    tiempoBlind: 10
};

// Variables de Estado para Lazy Loading
let mensajes = []; 
let paginaActual = 0;
const mensajesPorPagina = 20; 
let hayMasMensajes = true;
let estaCargando = false; 

const container = document.getElementById("missatges-container");
let centinela; 

// Lógica de Limpieza y Adjuntos
function limpiarCos(cos) {
    if (!cos) return "";
    cos = cos.split('\n').filter(line => !line.trim().startsWith('>')).join('\n');
    const cortes = ['On ', 'wrote:', 'va escriure', 'Llista de correu'];
    for (const corte of cortes) {
      const i = cos.indexOf(corte);
      if (i !== -1) cos = cos.slice(0, i).trim();
    }
    return cos;
}

function mostrarAdjunt(adjunts) {
    if (!adjunts) return "";
    const url = adjunts.trim();
    const ext = url.split('.').pop().toLowerCase();
    const esImg = ['jpg','jpeg','png','gif','webp'].includes(ext);
    return esImg
      ? `<img src="${url}" alt="Adjunt" style="max-width: 100%; margin-top: 0.5em;">`
      : `<a href="${url}" target="_blank">${url}</a>`;
}

// Renderizado del Mensaje Individual
function crearHTMLMensaje(msg) {
    return `
        <article class="missatge ${opciones.composicion}">
            <div class="assumpte">${msg.assumpte || "(sin asunto)"}</div>
            <div class="autor" style="display:${opciones.mostrarAutores ? 'block' : 'none'}">${msg.remitent}</div>
            <div class="data">${new Date(msg.data).toLocaleString()}</div>
            <div class="cos">${limpiarCos(msg.cos).replace(/\n/g, "<br>")}</div>
            ${msg.adjunts ? `<div>${mostrarAdjunt(msg.adjunts)}</div>` : ""}
            ${
                msg.reverberacions?.length
                ? msg.reverberacions.map(rev => `
                    <div class="reverberacio">
                        <div class="rev-cos">${limpiarCos(rev.cos).replace(/\n/g,'<br>')}</div>
                        <div class="rev-data">${new Date(rev.data).toLocaleString()}</div>
                        ${rev.adjunts ? mostrarAdjunt(rev.adjunts) : ""}
                    </div>`).join("")
                : ""
            }
        </article>
    `;
}

// Función para reordenar los mensajes ya cargados (SOLO para Aleatorio)
function reordenarMensajesCargados() {
    // Si la opción es aleatorio, mezclamos el array.
    if (opciones.orden === "aleatorio") {
        mensajes.sort(() => Math.random() - 0.5);
    } 
}

// Renderizado Final: Renderiza TODOS los mensajes cargados
export function renderMensajes() {
    if (!container) return; 
    const estilosTemas = ['soft', 'dark', 'light', 'radical', 'cambiante'];
    document.body.classList.remove(...estilosTemas); 
    document.body.classList.add(opciones.estiloVisual); 

    let clasesContainer = `container ${opciones.composicion}`;
    if (opciones.blindscroll) {
        clasesContainer += " blindscroll-activo"; 
    }
    container.className = clasesContainer;
    let mensajesParaMostrar = mensajes.slice(); 
    if (opciones.orden === 'inverso') {
        mensajesParaMostrar.reverse(); 
    }
    
    const mensajesHTML = mensajesParaMostrar.map(crearHTMLMensaje).join("");
    // Colocar el contenido renderizado
    container.innerHTML = mensajesHTML;

    // Añadir listeners de expansión si estamos en modo post-it
    if (opciones.composicion === 'post-it') {
        const mensajesRenderizados = container.querySelectorAll('.missatge.post-it');
        mensajesRenderizados.forEach(agregarListenerExpandir);
    }
    
    // El elemento centinela debe estar al final
    if (centinela) container.appendChild(centinela);
}

// Lógica de Carga y Fetching
async function cargarMensajes() {
    if (!hayMasMensajes || estaCargando) return;

    estaCargando = true;
    const proximaPagina = paginaActual + 1;
    
    // Construcción de la URL con parámetros para el API
    const dias = opciones.filtrosDia.join(',');
    const ordenApi = opciones.orden === 'aleatorio' ? 'cronologico' : opciones.orden;
    
    // Usamos 'cronologico' para el API si el cliente pide 'aleatorio',
    // porque la aleatorización se hace después en el cliente.
    const URL_PAGINADA = `${API_URL}?page=${proximaPagina}&limit=${mensajesPorPagina}&orden=${ordenApi}&dias=${dias}`;

    try {
        if (proximaPagina === 1) container.innerHTML = `<p>Carregant...</p>`;

        const res = await fetch(URL_PAGINADA, { headers: { "x-api-key": API_KEY } });
        
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const nuevosMensajes = await res.json();
        
        // 1. Añadir los nuevos mensajes a la lista global
        mensajes.push(...nuevosMensajes);
        
        // 2. Aplicar la ordenación aleatoria si está activa.
        if (opciones.orden === "aleatorio") {
             reordenarMensajesCargados();
        }
        
        // 3. Actualizar el estado de paginación
        paginaActual = proximaPagina;
        hayMasMensajes = nuevosMensajes.length === mensajesPorPagina;

        // 4. Renderizar todo el contenido (ahora con los nuevos)
        renderMensajes();
        
        // 5. Mostrar mensaje si no hay más
        if (!hayMasMensajes) {
            container.insertAdjacentHTML('beforeend', '<p style="text-align:center;">--- Fin de los mensajes ---</p>');
            observer.unobserve(centinela);
        }
        
    } catch (err) {
        console.error(err);
        if (paginaActual === 0) {
            container.innerHTML = `<p style="color:red;">❌ Error al cargar mensajes: ${err.message}</p>`;
        } else {
            container.insertAdjacentHTML('beforeend', `<p style="color:red;">❌ Error al cargar más mensajes.</p>`);
        }
    } finally {
        estaCargando = false;
    }
}

// --- Función de Reinicio de Carga ---
// Se llama cuando se cambian opciones que requieren consultar al API (orden, filtros)
export function reiniciarCarga() {
    observer.unobserve(centinela); // Detener observador
        
    mensajes = [];
    paginaActual = 0;
    hayMasMensajes = true;
    estaCargando = false;
    
    container.innerHTML = `<p>Carregant missatges...</p>`;
    
    cargarMensajes(); // Iniciar la carga de la primera página
    observer.observe(centinela); // Reiniciar observador
}


// --- Lógica del Intersection Observer (Detector de Scroll) ---
const observer = new IntersectionObserver(entries => {
    // Si el centinela está visible (isIntersecting) y hay más mensajes
    if (entries[0].isIntersecting && hayMasMensajes && !estaCargando) {
        cargarMensajes();
    }
}, { threshold: 0.1 });


// --- Inicialización ---
export function initMensajes() {
    if (!container) {
      console.error("Contenidor 'missatges-container' no trobat.");
      return {};
    }
    
    // Crear el elemento centinela
    centinela = document.createElement('div');
    centinela.id = 'centinela';
    centinela.style.height = '1px'; 
    container.appendChild(centinela);
    
    cargarMensajes(); // Cargar la primera página.
    observer.observe(centinela); // Empezar a observar.

    // Devolvemos lo necesario para que el panel pueda interactuar
    return { opciones, renderMensajes, reiniciarCarga }; 
}

function agregarListenerExpandir(mensajeElemento) {
    mensajeElemento.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        if (opciones.composicion === 'post-it') {
            mensajeElemento.classList.toggle('expandido');
        }
    });
}