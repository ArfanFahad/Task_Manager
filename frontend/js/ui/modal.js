export function showModal(message, type = "info") {
  const existing = document.querySelector(".custom-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.className = `custom-modal ${type}`;
  modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <button id="closeModalBtn">OK</button>
        </div>    
    `;

  document.body.appendChild(modal);
  document.getElementById("closeModalBtn").addEventListener("click", () => {
    modal.remove();
  });
}
