export function showModal(message) {
  const existing = document.querySelector(".custom-modal");
  if (existing) existing.remove(); // remove old modal

  const modal = document.createElement("div");
  modal.className = "custom-modal";
  modal.innerHTML = `
    <div class="modal-content">
        <p>Task Created: <b>${message}</b></p>
        <button id="closeModalBtn">OK</button>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closeModalBtn").addEventListener("click", () => {
    modal.remove();
  });
}
