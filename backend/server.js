import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UAParser } from "ua-parser-js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import router from "./routes/taskRoutes.js";
import { toggleTaskStatus } from "./controllers/taskController.js";
const app = express();

dotenv.config();

// Middleware for CORS (cross-origin requests)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Logs detailed client information for each request
// (Browser, OS, Device, IP and request details)
app.use((req, res, next) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();

  console.log("Incoming Request: ");
  console.log(`IP Address: ${req.ip}`);
  console.log(`Browser: ${result.browser.name} ${result.browser.version}`);
  console.log(`Operating System: ${result.os.name} ${result.os.version}`);
  console.log(`Device: ${result.device.type || "PC"}`);
  console.log(`Model: ${result.device.model || "N/A"}`);
  console.log(
    `Request URL: ${req.url} | Method: ${
      req.method
    } | Time: ${new Date().toLocaleTimeString()}`
  );
  console.log(`---------`);

  next();
});

// ===================
// API Routes Configuration
// ===================
// All task routes under /api/tasks namespace
// ===================
app.use("/api/tasks", taskRoutes);

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
