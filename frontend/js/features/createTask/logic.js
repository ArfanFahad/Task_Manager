import { createTaskInDB } from "../../api.js";

export const attachAddTaskHandler = () => {
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
};
