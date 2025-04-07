import express, { Router } from "express";
import {
  getTasks,
  createTask,
  removeTask,
  editTask,
} from "../controllers/taskController.js";

const router = express.Router();

//Route to get all tasks
router.get("/", getTasks);

// Route to create a task
router.post("/", createTask);

// Route to update a task
router.put("/:id", editTask);

// Route to delete a task
router.delete("/:id", removeTask);

export default router;
