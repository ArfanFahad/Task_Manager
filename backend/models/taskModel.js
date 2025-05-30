// import pool from "../config/db";
import pool from "../config/db.js";

// get all tasks
export const getAllTasks = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

// create new task
export const insertDataInDB = async (task_name, userId) => {
  try {
    const result = await pool.query(
      "INSERT INTO tasks (task_name, user_id) VALUES ($1, $2) RETURNING *",
      [task_name, userId]
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Inserting Data into Database: ", error);
    throw error;
  }
};

// delete a task
export const deleteTask = async (taskId) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING id",
      [taskId]
    );
    return { success: result.rowCount > 0, deleteId: result.rows[0]?.id };
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};
