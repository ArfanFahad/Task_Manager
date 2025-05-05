import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import router from "./routes/taskRoutes.js";
import { toggleTaskStatus } from "./controllers/taskController.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
const app = express();

dotenv.config();

// Middleware for CORS (cross-origin requests)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// ===================
// API Routes Configuration
// ===================
// All task routes under /api/tasks namespace
// ===================
app.use("/api/tasks", taskRoutes);

// ===================
// API Routes Configuration
// ===================
// All authentication routes under []
// ===================
app.use("/api/auth", authRoutes);

// PATCH /api/tasks/:id/toggle
router.patch("/:id/toggle", toggleTaskStatus);

// Tasting Protected Route
app.use("/api", authenticateUser);

// ===================
// Server Initialization
// ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

export default app;
