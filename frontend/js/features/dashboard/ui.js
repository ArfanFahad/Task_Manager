import { startClock } from "../../time.js";

export function initDashboardUI() {
  startClock();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.replace("/frontend/views/login.html");
    });
  }
}
