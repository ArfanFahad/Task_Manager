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
