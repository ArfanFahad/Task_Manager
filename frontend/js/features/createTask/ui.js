import { createTask } from "./logic.js";

export function attachAddTaskHandler() {
  const form = document.getElementById("create-task-form");
  const input = document.getElementById("task-input");
  const message = document.getElementById("task-message");

  if (!form || !input) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (!taskText) {
      message.textContent = "Task cannot be empty";
      return;
    }

    try {
      const newTask = await createTask(taskText);
      message.textContent = "Task Added";
      input.value = "";
    } catch (error) {
      message.textContent = error.message;
    }
  });
}
