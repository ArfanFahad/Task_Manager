export function showModal(title, message) {
  const existing = document.querySelector(".custom-modal");
  if (existing) existing.remove(); // remove old modal

  const modal = document.createElement("div");
  modal.className = "custom-modal";
  modal.innerHTML = `
    <div class="modal-content">
        <h2>${title}</h2>
        <p>${message}</p>
    </div>
  `;

  setTimeout(() => {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal);
    }
  }, 2000);

  document.body.appendChild(modal);

  const input = document.getElementById("taskInput");
  input.value = "";
}
