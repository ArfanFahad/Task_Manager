// selecting elements 
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks when the page loads 
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);


// event listener to add task 
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    
    if(taskText === "") {
        alert("Please enter a task");
        return;
    }

    addTaskToUI(taskText);
    taskInput.value = "";

});


function addTaskToUI (taskText, completed = false) {
    const li = document.createElement("li");
    li.textContent = taskText;

    if (completed) {
        li.classList.add("completed");
    }


    // toggle: completed class on click 
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasksToLocalStorage();
    })


    // add delete button 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.margin = "0.5rem";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasksToLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasksToLocalStorage();
}


// Function to save tasks to lcoal storage 
function saveTasksToLocalStorage() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.textContent.replace("Delete", "").trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach((task) => {
        addTaskToUI(task.text, task.completed);
    });
    saveTasksToLocalStorage();
}


