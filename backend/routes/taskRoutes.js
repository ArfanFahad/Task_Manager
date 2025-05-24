// /tasks, /tasks/:id - all protected
import express, { Router } from "express";
import {
  getTasks,
  createTask,
  removeTask,
  editTask,
  getTaskSummary,
} from "../controllers/taskController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

//Route to get all tasks
router.get("/", getTasks);

router.get("/getSummary", getTaskSummary);

// Route to create a task
router.post("/", authenticateUser, createTask);

// Route to update a task
router.put("/:id", editTask);

// Route to delete a task
router.delete("/:id", removeTask);

// Authentication Route
router.get("/", authenticateUser, getTasks);

export default router;
