import { toggleTaskStatus } from "../../api.js";

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

export const getCompletedTasks = () => {};
