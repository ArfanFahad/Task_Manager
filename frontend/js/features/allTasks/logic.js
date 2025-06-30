import { addTaskToUI } from "../../ui.js";
import { fetchTasksFromDB } from "../../api.js";
import { taskCompleted, completedTaskLogic } from "../completed/logic.js";
import { pendingTaskLogic } from "../pending/logic.js";

export const renderView = async () => {
  try {
    const tasks = await fetchTasksFromDB();
    tasks.forEach(addTaskToUI);
    taskCompleted(); // Line Through Feature
  } catch (error) {
    console.error("Error occured: ", error.message);
  }
};

// Completed Task Rendering in View
export const renderCompletedTask = async () => {
  try {
    const tasks = await completedTaskLogic();
    const list = document.getElementById("completedTasks");
    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = "<li>No completed tasks found.</li>";
      list.style.listStyleType = "none";
      list.style.marginTop = "20px";
      return;
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.task_name}`;
      li.classList.add("completed-task");
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error occurred: ", error.message);
  }
};

// Pending Task Rendering in View
export const pendingTasks = async () => {
  try {
    const tasks = await pendingTaskLogic();
    const list = document.getElementById("pendingTasks");
    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = "<li>No pending tasks found.</li>";
      list.style.listStyleType = "none";
      list.style.marginTop = "20px";
      return;
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.task_name}`;
      li.classList.add("pending-task");
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error occured: ", error.message);
  }
};
