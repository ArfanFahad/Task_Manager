import { loadWeather } from "../widgets/weather.js";
import { startClock } from "../widgets/time.js";
import { renderView, completedTask } from "../allTasks/logic.js";
import { getToken, clearSession } from "../../core/storage.js";
import { attachAddTaskHandler } from "../createTask/logic.js";
import { taskStats } from "./taskStats.js";

// Authentication Checking
export const ensureAuthenticated = () => {
  const token = getToken();

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.replace("/frontend/views/login.html");
  }
};

// Function that will catch the value of the caller
export const showContent = (parameter) => {
  const template = document.getElementById(`${parameter}-template`);
  const contentArea = document.getElementById("content-area");
  contentArea.innerHTML = "";

  ensureAuthenticated();

  if (template) {
    contentArea.appendChild(template.content.cloneNode(true));

    switch (parameter) {
      case "dashboard":
        loadWeather();
        startClock();
        taskStats();
        break;
      case "createTask":
        attachAddTaskHandler();
        break;
      case "allTasks":
        renderView();
        break;
      case "completed":
        completedTask();
        break;
    }
  } else {
    contentArea.innerHTML = "<p>Section not found.</p>";
  }
};

// Logout Functionality
export const logOut = () => {
  clearSession();
  window.location.replace("/frontend/views/login.html");
};
