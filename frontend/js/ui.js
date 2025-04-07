import { deleteTaskFromDB, updatedTaskInDB } from "./api.js";

// Function to display tasks with a Delete button
export function addTaskToUI(task) {
  const li = document.createElement("li");

  // Span for holding task items
  const taskText = document.createElement("span");
  taskText.textContent = task.task_name;
  taskText.dataset.id = task.id;
  taskText.classList.add("task-text");

  // Apply line-through if completed
  if (task.task_status) {
    taskText.classList.add("completed");
  }

  // Add Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.dataset.id = task.id;
  editBtn.addEventListener("click", async function () {
    if (editBtn.textContent === "Edit") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskText.textContent;
      input.classList.add("edit-input");

      li.replaceChild(input, taskText);
      editBtn.textContent = "Save";
    } else if (editBtn.textContent === "Save") {
      const updatedTaskName = li.querySelector(".edit-input").value;
      // Avoid empty tasks
      if (updatedTaskName.trim() === "") {
        alert("Task name cannot be empty");
        return;
      }
      try {
        // calling api to update the task in database
        await updatedTaskInDB(task.id, updatedTaskName);

        // update the ui
        taskText.textContent = updatedTaskName;
        li.replaceChild(taskText, li.querySelector(".edit-input"));
        editBtn.textContent = "Edit";
      } catch (error) {
        console.error("Error updating task: ", error);
        alert("Failed to update task.");
      }
    }
  });

  // Add Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", async () => {
    try {
      await deleteTaskFromDB(task.id);
      li.remove();
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  });

  // Button group for Holding edit and delete button
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");
  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(deleteBtn);

  // Pushing task into list
  li.appendChild(taskText);

  // Pushing buttonGroup inside list
  li.appendChild(buttonGroup);

  // Pushing the List into TaskList
  taskList.appendChild(li);
}
