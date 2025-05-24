import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "2h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};
