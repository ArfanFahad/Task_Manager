/*
    /register
    /login
    /verify 

    Main route of authentiation is: 
    /api/auth
*/
import { createUser } from "../models/userModel.js";
import { registerUser, verifyUser } from "../controllers/authController.js";
import express from "express";
const router = express.Router();

// Creating User
router.post("/register", registerUser, createUser);

// User Verification With Code
router.post("/verify", verifyUser);

export default router;
