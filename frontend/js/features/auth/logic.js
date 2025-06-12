// Auth Logic

import { saveToken, saveVerifyEmail } from "../../core/storage";

const API_BASE = "http:localhost:5000/api/auth";

export async function handleSignup(formData, messageElement) {
  const { username, email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    messageElement.textContent = "Password is not matching";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      saveVerifyEmail(email);
      window.location.href = "../../../views/verify.html";
    } else {
      messageElement.textContent = data.message || "Something Went Wrong";
    }
  } catch (error) {
    messageElement.textContent = "Network error";
  }
}

export async function handleLogin(formData, messageElement) {
  const { email, password } = formData;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      saveToken(data.token);
      window.location.href = "../../../../frontend/views/dashboard.html";
    } else {
      messageElement.textContent = data.message || "Something went wrong.";
    }
  } catch (error) {
    messageElement.textContent = "Network error.";
  }
}
