// Sends verification code using nodemailer
import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export async function sendVerificationEmail(toEmail, verificationCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
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
