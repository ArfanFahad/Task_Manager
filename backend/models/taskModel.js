// import pool from "../config/db";
import pool from "../config/db.js";

// get all tasks
export const getAllTasks = async () => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

// create new task
export const insertDataInDB = async (task_name) => {
  try {
    const result = await pool.query(
      "INSERT INTO tasks (task_name) VALUES ($1) RETURNING *",
      [task_name]
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
