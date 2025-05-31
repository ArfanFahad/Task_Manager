import { startClock } from "./time.js";
import { loadWeather } from "./weather.js";
import { renderView, attachAddTaskHandler } from "./app.js";

// Function that will check token
export function ensureAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.replace("/frontend/views/login.html");
  }
}

// Function that will catch the value of the caller
export function showContent(parameter) {
  const template = document.getElementById(`${parameter}-template`);
  const contentArea = document.getElementById("content-area");
  contentArea.innerHTML = "";

  ensureAuthenticated();

  if (template) {
    contentArea.appendChild(template.content.cloneNode(true));

    switch (parameter) {
      case "dashboard":
        loadWeather();
        break;
      case "createTask":
        attachAddTaskHandler();
        break;
      case "allTasks":
        renderView();
        break;
    }
  } else {
    contentArea.innerHTML = "<p>Section not found</p>";
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
