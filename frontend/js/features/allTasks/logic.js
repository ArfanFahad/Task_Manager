import { addTaskToUI } from "../../ui.js";
import { fetchTasksFromDB } from "../../api.js";
import { taskCompleted } from "../completed/logic.js";

export const renderView = async () => {
  try {
    const tasks = await fetchTasksFromDB();
    tasks.forEach(addTaskToUI);
    taskCompleted(); // Line Through Feature
  } catch (error) {
    console.error("Error occured: ", error.message);
  }
};
