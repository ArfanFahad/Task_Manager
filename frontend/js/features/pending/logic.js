import { getToken } from "../../core/storage.js";
const base_url = "http://localhost:5000/user/pending";

// Logic of Pending Tasks
export const pendingTaskLogic = async () => {
  try {
    const response = await fetch(base_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch pending tasks.");
    }

    const data = await response.json();
    return data.user_tasks;
  } catch (error) {
    console.error("Error fetching pending tasks: ", error.message);
    return [];
  }
};
