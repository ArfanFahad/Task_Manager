// import pool from "../config/db";
import pool from "../config/db.js";

// get all tasks 
export const getAllTasks = async () => {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    return result.rows;
};


// add a new task 
export const addTask = async () => {
    const result = await pool.query(
        "INSERT INTO tasks (task_name, task_status) VALUES ($1, $2) RETURNING *",[taskName, task_status]
    );
    return result.rows[0];
};

// update task 
export const updateTask = async (taskId, taskName, task_status) => {
    const result = await pool.query(
        "UPDATE tasks SET task_name = $1, task_status = $2 WHERE id = $3 RETURNING *",[taskName, task_status, taskId]
    );
    return result.rows[0];
}

// delete a task 
export const deleteTask = async (taskId) => {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1", [taskId]
    );
    return result.rowCount;
};