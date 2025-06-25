import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import router from "./routes/taskRoutes.js";
import { toggleTaskStatus } from "./controllers/taskController.js";
const app = express();

dotenv.config();

// Middleware for CORS (cross-origin requests)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// ===================
// API Routes Configuration, API With No Middleware
// ===================
// All tasks for data for landingpage
// API /tasks/getSummary
// ===================
app.use("/tasks", taskRoutes);

// ===================
// API Routes Configuration, API With No Middleware
// ===================
// Tasks of Single User on Dashboard
// API /taskStats
// ===================
app.use("/taskStats", taskRoutes);

// ===================
// API Routes Configuration
// ===================
// All task routes under /api/tasks namespace
// API With Middleware / GET
// ===================
app.use("/api/tasks", taskRoutes);

// ===================
// API Routes Configuration
// ===================
// Only Completed Tasks for Single User
// API With Middleware / GET
// ===================
app.use("/user", taskRoutes);

// ===================
// API Routes Configuration
// ===================
// All authentication routes under []
// ===================
app.use("/api/auth", authRoutes);

// PATCH /api/tasks/:id/toggle
router.patch("/:id/toggle", toggleTaskStatus);

// ===================
// Server Initialization
// ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

export default app;
