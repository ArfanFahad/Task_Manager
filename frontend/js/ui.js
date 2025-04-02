import { deleteTaskFromDB } from "./api.js";

// Function to display tasks with a Delete button
export function addTaskToUI(task) {
  const li = document.createElement("li");
  li.textContent = task.task_name;
  li.dataset.id = task.id;

  // Apply line-through if completed
  if (task.task_status) {
    li.classList.add("completed");
  }

  // Add Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.dataset.id = task.id;

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

  // Append the Edit button to the list item
  li.appendChild(editBtn);
  // Append the Delete button to the list item
  li.appendChild(deleteBtn);
  // Append the list item to the task list
  taskList.appendChild(li);
}
