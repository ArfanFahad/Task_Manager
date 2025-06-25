import pool from "../config/db.js";
import {
  getAllTasks,
  insertDataInDB,
  deleteTask,
} from "../models/taskModel.js";

//  controller to fetch all tasks
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await getAllTasks(userId);
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
    const userId = req.user.id;

    // Input Validation
    if (!task_name || typeof task_name != "string") {
      return res.status(400).json({
        error: "Task name is required and must be a string",
      });
    }

    // Insert into DB
    const insertableDate = await insertDataInDB(task_name, userId);

    // Return the created task with 201 status
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: insertableDate,
    });
  } catch (error) {
    console.error("Error Sending Data: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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

// Getting Task Summary for Landing Page
export const getTaskSummary = async (req, res) => {
  try {
    const totalQuery = await pool.query(`SELECT COUNT(*) FROM tasks`);
    const completedQuery = await pool.query(
      `SELECT COUNT(*) FROM tasks WHERE task_status = true`
    );
    const incompleteQuery = await pool.query(
      `SELECT COUNT(*) FROM tasks WHERE task_status = false`
    );

    res.json({
      total: parseInt(totalQuery.rows[0].count),
      completed: parseInt(completedQuery.rows[0].count),
      incomplete: parseInt(incompleteQuery.rows[0].count),
    });
  } catch (error) {
    console.error("Error getting task summary: ", error);
    res.status(500).json({ error: "Failed to fetch task summary" });
  }
};

// Getting Task Stats for Dashboard for Sigle User
export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await pool.query(
      `SELECT COUNT(*) FROM tasks WHERE user_id = $1`,
      [userId]
    );

    const completed = await pool.query(
      `SELECT COUNT(*) FROM tasks WHERE user_id = $1 AND task_status = true`,
      [userId]
    );

    const pending = await pool.query(
      `SELECT COUNT(*) FROM tasks WHERE user_id = $1 AND task_status = false`,
      [userId]
    );

    res.status(200).json({
      total: parseInt(total.rows[0].count),
      completed: parseInt(completed.rows[0].count),
      pending: parseInt(pending.rows[0].count),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get single task stats", error: err.message });
  }
};

// Getting completed task of user
export const getCompletedTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const user_tasks = await pool.query(
      `SELECT task_name FROM tasks WHERE user_id = $1 AND task_status = true`,
      [userId]
    );

    res.status(200).json({
      user_tasks: user_tasks.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get user_tasks",
      error: err.message,
    });
  }
};
