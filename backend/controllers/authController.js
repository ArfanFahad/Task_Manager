import {
  createUser,
  getUserByEmail,
  markUserAsVerified,
} from "../models/userModel.js";
import { hashPassword } from "../utils/hash.js";
import { generateVerificationCode } from "../utils/generateCode.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email is already registered
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: "Email Already Exist." });
    }

    // Password hashing
    const hashPass = await hashPassword(password);

    // Generating verification code
    const code = generateVerificationCode();

    // Dynamically sending code to email
    await sendVerificationEmail(email, code);

    // Verification code expiration time
    const vExp = new Date(Date.now() + 20 * 60 * 1000);

    const newUser = await createUser(username, email, hashPass, code, vExp);
    return res
      .status(201)
      .json({ message: "User Registered Successfully.", newUser });
  } catch (error) {
    console.error("Error registering user: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyUser = async (req, res) => {
  const { email, code } = req.body;

  const user = await getUserByEmail(email);

  // 1. If user doesn't exist in the database.
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 2. If DB verification_code doesn't match with users
  if (user.verification_code !== code.toString()) {
    return res.status(400).json({ message: "Invalid verification" });
  }

  // 3. If user is already verified.
  if (user.is_verified) {
    return res.status(400).json({ message: "User already verified" });
  }

  // 4. If verification code is already expired
  if (new Date() > new Date(user.verification_expires)) {
    console.warn`⚠ verification code expired for email: ${email} at ${new Date().toLocaleTimeString()}`;
    return res.status(400).json({
      message: "Verification code expired. Please request a new one.",
    });
  }

  // 5. In is_verified column in DB, marks as "true"
  await markUserAsVerified(email);
  res.json({ message: "Email verified successfully" });
};
