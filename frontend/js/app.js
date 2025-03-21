// selecting elements
import { fetchTasksFromDB } from "./api.js";
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks when the page loads
document.getElementById("getTaskBtn").addEventListener("click", async () => {
  const tasks = await fetchTasksFromDB();
  console.log(tasks);
  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.task_name;
    taskList.appendChild(listItem);
  });
});

// // event listener to add task
// addTaskBtn.addEventListener("click", () => {
//   const taskText = taskInput.value.trim();

//   if (taskText === "") {
//     alert("Please enter a task");
//     return;
//   }

//   addTaskToUI(taskText);
//   taskInput.value = "";
// });

// // function to add task to ui
// function addTaskToUI(taskText, completed = false) {
//   const li = document.createElement("li");
//   li.textContent = taskText;
//   li.style.marginTop = "0.5rem";
//   li.style.marginLeft = "1.5rem";

//   // mark completed tasks
//   if (completed) {
//     li.classList.add("completed");
//   }

//   taskList.appendChild(li);

//   // toggle: completed class on click
//   li.addEventListener("click", () => {
//     li.classList.toggle("completed");
//     saveTasksToLocalStorage();
//   });

//   // enable editing on double-click
//   li.addEventListener("dblclick", () => editTask(li));

//   // add delete button
//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Delete";
//   deleteBtn.style.margin = "0.5rem";
//   deleteBtn.classList.add("btn-style");
//   deleteBtn.addEventListener("click", () => {
//     li.remove();
//     saveTasksToLocalStorage();
//   });
//   li.appendChild(deleteBtn);

//   saveTasksToLocalStorage();
// }

// // function to edit task
// function editTask(li) {
//   const oldText = li.firstChild.textContent;
//   const input = document.createElement("input");
//   input.type = "text";
//   input.value = oldText;

//   //replace text with input field
//   li.textContent = "";
//   li.appendChild(input);
//   input.focus();

//   //save changes when enter is pressed or input loses focus
//   input.addEventListener("blur", () => saveTasksToLocalStorage(li, input));
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//       savedEditedTask(li, input);
//     }
//   });
// }

// //function to save the edited task
// function savedEditedTask(li, input) {
//   const newText = input.value.trim();
//   if (newText) {
//     li.textContent = newText;
//     li.addEventListener("dblclick", () => editTask(li));
//     saveTasksToLocalStorage();
//   } else {
//     li.remove();
//   }
// }

// // Function to save tasks to lcoal storage
// function saveTasksToLocalStorage() {
//   const tasks = [];

//   document.querySelectorAll("#taskList li").forEach((li) => {
//     tasks.push({
//       text: li.textContent.replace("Delete", "").trim(),
//       completed: li.classList.contains("completed"),
//     });
//   });
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// function loadTasksFromLocalStorage() {
//   const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   savedTasks.forEach((task) => {
//     addTaskToUI(task.text, task.completed);
//   });

//   saveTasksToLocalStorage();
// }
