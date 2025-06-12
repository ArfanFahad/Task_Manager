import { getToken } from "../../core/storage.js";

const API_BASE = "http://localhost:5000/api/tasks";

export async function fetchAllTasks() {
  const token = getToken();

  try {
    const res = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch tasks");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
