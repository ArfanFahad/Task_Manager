// selecting elements
import { fetchTasksFromDB, deleteTaskFromDB } from "./api.js";
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

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

// Function to display tasks with a Delete button
function addTaskToUI(task) {
  const li = document.createElement("li");
  li.textContent = task.task_name;
  li.dataset.id = task.id;

  // Add Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", async () => {
    try {
      await deleteTaskFromDB(task.id);
      li.remove();
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  });

  // Append the Delete button to the list item
  li.appendChild(deleteBtn);

  // Append the list item to the task list
  taskList.appendChild(li);
}
