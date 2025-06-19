import { showContent } from "./features/dashboard/logic.js";
import { logOut } from "./features/dashboard/logic.js";

document.querySelectorAll("button[data-section]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    showContent(section);
  });
});

// Logout Functionality
document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  logOut();
});

// Show dashboard by default on initial load
document.addEventListener("DOMContentLoaded", () => {
  showContent("dashboard");
});
