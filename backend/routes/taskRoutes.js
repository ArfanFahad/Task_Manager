// /tasks, /tasks/:id - all protected
import express, { Router } from "express";
import {
  getTasks,
  createTask,
  removeTask,
  editTask,
  getTaskSummary,
  getTaskStats,
} from "../controllers/taskController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// OPEN API for Task Summary
router.get("/getSummary", getTaskSummary);

// Protected API for Single Users Tasks Summary
router.get("/user", authenticateUser, getTaskStats);

//Route to get all tasks
router.get("/", authenticateUser, getTasks);

// Route to create a task
router.post("/", authenticateUser, createTask);

// Route to update a task
router.put("/:id", editTask);

// Route to delete a task
router.delete("/:id", removeTask);

export default router;
