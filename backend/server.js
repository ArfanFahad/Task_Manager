import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
const app = express();

dotenv.config();

// middleware 
app.use(cors());
app.use(express.json());


//routes 
app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);


//start server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, async ()=> {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
})

export default app;