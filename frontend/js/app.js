// selecting elements
import { fetchTasksFromDB, createTaskInDB, toggleTaskStatus } from "./api.js";
import { addTaskToUI } from "./ui.js";
import { showContent } from "./dashboard.js";
// import { ensureAuthenticated } from "./dashboard.js";
showContent("dashboard"); // Default Loading Section

function renderView() {
  const template = document.getElementById("createTask-template");
  const clone = template.content.cloneNode(true);

  const container = document.getElementById("content-area");
  container.innerHTML = "";
  container.appendChild(clone);

  attachAddTaskHandler();
}

function attachAddTaskHandler() {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const input = document.getElementById("taskInput");

  if (addTaskBtn && input) {
    addTaskBtn.addEventListener("click", async () => {
      const taskName = input.value.trim();
      if (taskName) {
        try {
          await createTaskInDB(taskName);
          input.value = "";
        } catch (error) {
          console.error("Error creating task: ", error);
        }
      }
    });
  }
}

// Load tasks when the page loads
document.getElementById("getTaskBtn").addEventListener("click", async () => {
  try {
    const tasks = await fetchTasksFromDB();

    tasks.forEach((task) => {
      addTaskToUI(task);
    });
  } catch (error) {
    console.error("Error fetching tasks: ", error);
  }
});

// Making task clickable and applying line-through on tasks
// document.addEventListener("DOMContentLoaded", () => {
//   taskList.addEventListener("click", async (event) => {
//     if (event.target.tagName === "SPAN") {
//       const taskId = event.target.dataset.id;
//       const updatedTask = await toggleTaskStatus(taskId);

//       if (updatedTask) {
//         event.target.classList.toggle("completed", updatedTask.task_status);
//       }
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", renderView);
