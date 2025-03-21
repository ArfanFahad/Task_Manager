import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../models/taskModel.js";

//  controller to fetch all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller to add a task
export const createTask = async (req, res) => {
  const { taskName, task_status } = req.body;
  try {
    const task = await addTask(taskName, task_status);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error adding task: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller to update a task
export const modifyTask = async (req, res) => {
  const { id } = req.params;
  const { taskName, task_status } = req.body;

  try {
    const updated_Task = await updateTask(id, taskName, task_status);
    if (updated_Task) {
      res.json(updateTask);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller to delete a task
export const removeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteTask(id);
    if (deleted) {
      res.json({ messsage: "Task deleted successfully." });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
