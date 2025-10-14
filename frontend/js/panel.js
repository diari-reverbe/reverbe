export function initPanel(opciones, renderMensajes, reiniciarCarga) {
  if (!opciones || !renderMensajes || !reiniciarCarga) {
    console.error("Faltan referencias necesarias en initPanel.");
    return;
  }

  // Panel y botones de abrir/cerrar
  const btnPanel = document.getElementById("btn-panel");
  const panel = document.getElementById("panel-control");
  const btnCerrar = document.getElementById("cerrar-panel");

  btnPanel.addEventListener("click", () => panel.classList.toggle("panel-visible"));
  btnCerrar.addEventListener("click", () => panel.classList.remove("panel-visible"));

  // Selects y checkboxes
  const ordenSelect = document.getElementById("orden");
  const mostrarAutoresCheckbox = document.getElementById("mostrar-autores");
  const estiloVisualSelect = document.getElementById("estilo-visual");
  const composicionSelect = document.getElementById("composicion");
  const blindscrollCheckbox = document.getElementById("blindscroll");
  const filtroDiaSelect = document.getElementById("filtro-dia");

  // Configurar valores iniciales del panel
  ordenSelect.value = opciones.orden;
  mostrarAutoresCheckbox.checked = opciones.mostrarAutores;
  estiloVisualSelect.value = opciones.estiloVisual;
  composicionSelect.value = opciones.composicion;
  blindscrollCheckbox.checked = opciones.blindscroll;

  // LISTENERS: Clasificados por necesidad de recarga
  
  // Requieren Reiniciar Carga (API)
  ordenSelect.addEventListener("change", e => { 
    opciones.orden = e.target.value; 
    reiniciarCarga(); // Recargar datos desde el inicio
  });
  
  filtroDiaSelect.addEventListener("change", e => {
    opciones.filtrosDia = Array.from(e.target.selectedOptions).map(opt => opt.value);
    reiniciarCarga(); // Recargar datos desde el inicio con el nuevo filtro
  });

  // Solo Requieren Re-Renderizado (Cliente)
  mostrarAutoresCheckbox.addEventListener("change", e => { 
    opciones.mostrarAutores = e.target.checked; 
    renderMensajes(); 
  });
  
  estiloVisualSelect.addEventListener("change", e => { 
    opciones.estiloVisual = e.target.value; 
    renderMensajes(); 
  });
  
  composicionSelect.addEventListener("change", e => { 
    opciones.composicion = e.target.value; 
    renderMensajes(); 
  });
  
  blindscrollCheckbox.addEventListener("change", e => { 
    opciones.blindscroll = e.target.checked; 
    renderMensajes(); 
  });
}