import { getToken } from "../../core/storage.js";

const API_BASE = "http://localhost:5000/api/tasks";

export async function createTask(taskText) {
  const token = getToken();

  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task: taskText }),
    });

    const data = await res.json();

    if (res.ok) {
      throw new Error(data.message || "Failed to create task");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
