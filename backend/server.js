import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UAParser } from "ua-parser-js";
import taskRoutes from "./routes/taskRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
const app = express();

dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
// middleware to log details
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

//routes
app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

export default app;
