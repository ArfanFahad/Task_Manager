import { fetchAllTasks } from "./logic.js";

export async function renderView() {
  const container = document.getElementById("tasks-container");
  const message = document.getElementById("task-list-message");

  if (!container) return;

  container.innerHTML = "";
  message.textContent = "Loading...";

  try {
    const tasks = await fetchAllTasks();

    if (tasks.length === 0) {
      message.textContent = "No tasks found.";
      return;
    }

    message.textContent = "";

    tasks.foreach((task) => {
      const taskEl = document.createElement("div");
      taskEl.classList.add("task-item");

      taskEl.textContent = task.task;
      container.appendChild(taskEl);
    });
  } catch (error) {
    message.textContent = error.message;
  }
}
