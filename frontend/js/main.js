import { initPanel } from "./panel.js";
import { initMensajes } from "./mensajes.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializa mensajes y recupera las opciones, la función de renderizado local 
  // y la función de reinicio de carga.
  const { opciones, renderMensajes, reiniciarCarga } = initMensajes();
  
  // 2. Inicializa el panel pasándole todas las referencias.
  initPanel(opciones, renderMensajes, reiniciarCarga);
});