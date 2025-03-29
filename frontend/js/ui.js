import { deleteTaskFromDB } from "./api.js";

// Function to display tasks with a Delete button
export function addTaskToUI(task) {
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

//function for line-through effect
export function toggleTaskUI(liElement) {
  liElement.classList.toggle("completed");
}
