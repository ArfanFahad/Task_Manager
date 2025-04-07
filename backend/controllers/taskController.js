import pool from "../config/db.js";
import {
  getAllTasks,
  insertDataInDB,
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

// Controller to add new task
export const createTask = async (req, res) => {
  try {
    const { task_name } = req.body;

    // Input Validation
    if (!task_name || typeof task_name != "string") {
      return res.status(400).json({
        error: "Task name is required and must be a string",
      });
    }

    // Insert into DB
    const insertableDate = await insertDataInDB(task_name);

    // Return the created task with 201 status
    res.status(201).json({
      success: true,
      messsage: "Task created successfully",
      task: insertableDate,
    });
  } catch (error) {
    console.error("Error Sending Data: ", error);
    throw error;
  }
};

// Controller to edit task
export const editTask = async (req, res) => {
  const { id } = req.params;
  const { task_name } = req.body;

  try {
    await pool.query("UPDATE tasks SET task_name = $1 WHERE id = $2", [
      task_name,
      id,
    ]);
    res.json({ success: true, message: "Task Updated Successfully." });
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

// Toggle Task Status
export const toggleTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Getting the current status of the task
    const { rows } = await pool.query(
      "SELECT task_status FROM tasks WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const currentStatus = rows[0].task_status;
    const newStatus = !currentStatus;

    // Update the database
    await pool.query("UPDATE tasks SET task_status = $1 WHERE id = $2", [
      newStatus,
      id,
    ]);

    res.json({ success: true, task_status: newStatus });
  } catch (error) {
    console.error("Error toggling task status: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
