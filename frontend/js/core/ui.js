// core/ui.js

export function initUI() {
  // Sidebar toggle
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }

  // Handle modal open/close (example)
  document.querySelectorAll("[data-modal-open]").forEach((btn) => {
    const modalId = btn.getAttribute("data-modal-open");
    btn.addEventListener("click", () => {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove("hidden");
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) modal.classList.add("hidden");
    });
  });
}
