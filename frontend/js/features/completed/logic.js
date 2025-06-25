import { toggleTaskStatus } from "../../api.js";
import { getToken } from "../../core/storage.js";
const base_url = "http://localhost:5000/user/completed";

// Making task clickable and applying line-through on tasks
export const taskCompleted = () => {
  const taskList = document.getElementById("taskList");

  if (!taskList) {
    console.warn("taskList element not found");
    return;
  }

  taskList.addEventListener("click", async (event) => {
    if (event.target.tagName === "SPAN") {
      const taskId = event.target.dataset?.id;
      if (!taskId) return;

      try {
        const updatedTask = await toggleTaskStatus(taskId);
        if (!updatedTask) {
          console.error(`Failed to update task with ID ${taskId}`);
        } else {
          event.target.classList.toggle("completed", updatedTask.task_status);
        }
      } catch (error) {
        console.error("An error occured while updating task status");
      }
    }
  });
};

// Logic of Completed Tasks
export const completedTaskLogic = async () => {
  try {
    const response = await fetch(base_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch completed tasks.");
    }

    const data = await response.json();
    return data.user_tasks;
  } catch (error) {
    console.error("Error fetching completed tasks: ", error.message);
    return [];
  }
};
