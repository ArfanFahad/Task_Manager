const base_url = "http://localhost:5000/api/tasks";

// Fetch tasks from database
export async function fetchTasksFromDB() {
  try {
    const response = await fetch(base_url);
    return await response.json(); // it will parses the response body as JSON and returns a js object or array
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
      },
      body: JSON.stringify({ task_name: task_name }),
    });

    console.log(response);

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

// Delete task from database
export async function deleteTaskFromDB(taskId) {
  try {
    await fetch(`${base_url}/${taskId}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
}
