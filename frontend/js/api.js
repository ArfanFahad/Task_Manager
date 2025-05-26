const base_url = "http://localhost:5000/api/tasks";
const token = localStorage.getItem("token");

// Fetch tasks from database
export async function fetchTasksFromDB() {
  try {
    const response = await fetch(base_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch Task");
    }

    return await response.json(); // Parses the response body as JSON and returns a js object or array
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];
  }
}

// Creating task in DB
export async function createTaskInDB(task_name) {
  try {
    const response = await fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task_name: task_name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error Saving Data: ", error);
    throw error;
  }
}

// Update task from database
export async function updatedTaskInDB(taskId, newTaskName) {
  const response = await fetch(`${base_url}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task_name: newTaskName }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
}

// Delete task from database
export async function deleteTaskFromDB(taskId) {
  try {
    await fetch(`${base_url}/${taskId}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
}

// Patch Request for updating task_status
export async function toggleTaskStatus(taskId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tasks/${taskId}/toggle`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling task: ", error);
  }
}
