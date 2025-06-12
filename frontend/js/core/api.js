export function baseURL() {
  return "http://localhost:5000/api/tasks";
}

export function tokenFromLocalStorage() {
  return localStorage.getItem("token");
}

export function authHeaders() {
  const token = tokenFromLocalStorage();
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
      };
}

// Fetch tasks from database
export async function fetchTasksFromDB() {
  try {
    const response = await fetch(baseURL(), {
      method: "GET",
      headers: authHeaders(),
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
    const response = await fetch(baseURL(), {
      method: "POST",
      headers: authHeaders(),
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
export async function updateTaskInDB(taskId, newTaskName) {
  const response = await fetch(`${baseURL()}/${taskId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ task_name: newTaskName }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
}

// Delete task from database
export async function deleteTaskFromDB(taskId) {
  try {
    await fetch(`${baseURL()}/${taskId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
}

// Patch Request for updating task_status
export async function toggleTaskStatus(taskId) {
  try {
    const response = await fetch(`${baseURL()}/${taskId}/toggle`, {
      method: "PATCH",
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to update task status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling task: ", error);
  }
}
