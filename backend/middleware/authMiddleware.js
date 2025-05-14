// Checks JWT, adds req.user
import jwt, { decode } from "jsonwebtoken";
import { config } from "../config/config.js";

export const authenticateUser = (req, res, next) => {
  // Extract authorization header
  const authHeader = req.headers.authorization;

  // Checking if header exists and follows Bearer scheme
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  // Extract token from header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Attach user data to request object
    req.user = decoded;

    next();
  } catch (error) {
    // Handling invalid/exppired token
    return res.status(401).json({ message: "Invalid token" });
  }
};
