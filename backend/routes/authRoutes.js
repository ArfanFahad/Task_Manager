/*
    /register
    /login
    /verify 

    Main route of authentiation is: 
    /api/auth
*/
import { createUser } from "../models/userModel.js";
import {
  registerUser,
  verifyUser,
  loginUser,
  resendCode,
} from "../controllers/authController.js";
import express from "express";
const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Verification what With Code
router.post("/verify", verifyUser);

// User Login
router.post("/login", loginUser);

// User Resend Verification
router.post("/resend-code", resendCode);

export default router;
