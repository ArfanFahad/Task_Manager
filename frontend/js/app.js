// selecting elements
import { fetchTasksFromDB, createTaskInDB, toggleTaskStatus } from "./api.js";
import { addTaskToUI } from "./ui.js";
import { showContent } from "./dashboard.js";
import { ensureAuthenticated } from "./dashboard.js";
showContent("dashboard"); // Default Loading Section

const taskList = document.getElementById("taskList");
// const inputValue = document.getElementById("taskInput");

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

// Event for taking the value
// document.getElementById("addTaskBtn").addEventListener("click", async () => {
//   const getValue = inputValue.value.trim();
//   try {
//     await createTaskInDB(getValue);
//     inputValue.value = "";
//   } catch (error) {
//     console.error("Error Passing Data: ", error);
//   }
// });

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
