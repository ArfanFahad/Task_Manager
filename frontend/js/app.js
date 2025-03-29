// selecting elements
import { fetchTasksFromDB, createTaskInDB } from "./api.js";
import { addTaskToUI, toggleTaskUI } from "./ui.js";

const taskList = document.getElementById("taskList");
const inputValue = document.getElementById("taskInput");

document.addEventListener("DOMContentLoaded", () => {
  taskList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      console.log(event.target);
      toggleTaskUI(event.target);
    }
  });
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
    inputValue.value = "";
  } catch (error) {
    console.error("Error Passing Data: ", error);
  }
});
