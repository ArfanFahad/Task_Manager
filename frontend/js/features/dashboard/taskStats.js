import { getToken } from "../../core/storage.js";

export const taskStats = async () => {
  const res = await fetch("http://localhost:5000/taskStats/user", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    document.getElementById("totalTasks").textContent = data.total;
    document.getElementById("completedTasks").textContent = data.completed;
    document.getElementById("pendingTasks").textContent = data.pending;
  } else {
    alert("Failed");
  }
};
