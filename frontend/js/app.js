// selecting elements
import { fetchTasksFromDB, createTaskInDB, toggleTaskStatus } from "./api.js";
import { addTaskToUI } from "./ui.js";
import { showContent } from "./dashboard.js";
// import { ensureAuthenticated } from "./dashboard.js";
showContent("dashboard"); // Default Loading Section
renderView();

const taskList = document.getElementById("taskList");

export function renderView() {
  try {
    GettingTask(); // Function Call
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

export function attachAddTaskHandler() {
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
  } else {
    console.warn("Add task button or input not found");
  }
}

function GettingTask() {
  // Load tasks when the page loads

  const oldBtn = document.getElementById("getTaskBtn");
  if (!oldBtn) {
    console.warn("getTaskBtn not found");
    return;
  }

  const newBtn = oldBtn.cloneNode(true);
  oldBtn.replaceWith(newBtn);

  newBtn.addEventListener("click", async () => {
    try {
      // const taskList = document.getElementById("taskList");

      if (taskList) {
        taskList.innerHTML = "";
      }

      const tasks = await fetchTasksFromDB();
      tasks.forEach(addTaskToUI);
    } catch (error) {
      console.error("Error fetching tasks: ", error.message);
    }
  });
}

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

// document.addEventListener("DOMContentLoaded", function () {
//   renderView();
// });
