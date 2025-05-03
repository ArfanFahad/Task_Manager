// Sends verification code using nodemailer
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// import { genereateVerificationCode } from "./generateCode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export async function sendVerificationEmail(toEmail, verificationCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter
    .verify()
    .then(() => {
      console.log("SMTP Connection Successful");
    })
    .catch((error) => {
      console.error("SMTP Connection Failed: ", error.message);
    });

  const mailOptions = {
    from: "noreplay@example.com",
    to: toEmail,
    subject: "Your Verification Code",
    text: `Your Verification Code is: ${verificationCode}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email has been sent.");
  } catch (error) {
    console.error("Failed to send email: ", error.message);
  }
}

// sendVerificationEmail("mrsfarjanafahad@gmail.com", genereateVerificationCode());
