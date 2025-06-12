// Dashboard Logic
import { loadWeather } from "../../weather.js";
import { renderView, attachAddTaskHandler } from "../../app.js";
import { getToken, clearSession } from "../../core/storage.js";

// Authentication Checking
export function ensureAuthenticated() {
  const token = getToken();

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
