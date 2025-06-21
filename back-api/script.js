document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("centraleta-container");
  if (!container) return;

  fetch(os.getenv("BACKEND_URL"), {
    headers: {
      "X-API-Key": os.getenv("BACKEND_API_KEY")
    }
  })
    .then(res => res.json())
    .then(data => {
      container.innerHTML = data.map(msg => `
        <div class="missatge">
          <h3>${msg.assumpte}</h3>
          <p class="remitent">${msg.remitent}</p>
          <p class="cos">${msg.cos}</p>
        </div>
      `).join("");
    })
    .catch(err => {
      container.innerHTML = "<p>❌ No s'han pogut carregar els missatges.</p>";
    });
});
