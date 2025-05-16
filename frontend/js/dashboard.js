import { startClock } from "./time.js";
import { loadWeather } from "./weather.js";

// Function that will check token
export function ensureAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Session expired. Please lgoin again.");
    window.location.replace("/frontend/views/login.html");
  }
}

// Function that will catch the value of the caller
export function showContent(parameter) {
  const template = document.getElementById(`${parameter}-template`);
  const contentArea = document.getElementById("content-area");
  ensureAuthenticated(); // Checking Token for Every Request

  if (template) {
    contentArea.innerHTML = "";
    const clone = template.content.cloneNode(true);
    contentArea.appendChild(clone);

    // Loading Weather
    if (parameter === "dashboard") {
      loadWeather();
    }
  } else {
    contentArea.innerHTML = "<p>Section is not found.</p>";
  }
}

window.showContent = showContent;
startClock();

// Logout Functionality
document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();

  localStorage.clear();
  window.location.replace("/frontend/views/login.html");
});
