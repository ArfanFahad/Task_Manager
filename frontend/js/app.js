// selecting elements
import { fetchTasksFromDB, createTaskInDB } from "./api.js";
import { addTaskToUI } from "./ui.js";

const taskList = document.getElementById("taskList");
let inputValue;

// Waiting for DOM to load before assignment
document.addEventListener("DOMContentLoaded", () => {
  inputValue = document.getElementById("taskInput");
});

// Load tasks when the page loads
document.getElementById("getTaskBtn").addEventListener("click", async () => {
  try {
    const tasks = await fetchTasksFromDB();

    taskList.innerHTML = "";

    tasks.forEach((task) => {
      addTaskToUI(task);
    });
  } catch (error) {
    console.error("Error fetching tasks: ", error);
  }
});

// Event for taking the value
document.getElementById("addTaskBtn").addEventListener("click", async () => {
  const getValue = inputValue.value.trim();
  try {
    await createTaskInDB(getValue);
  } catch (error) {
    console.error("Error Passing Data: ", error);
  }
});
