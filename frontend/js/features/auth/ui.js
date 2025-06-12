// ui.js

import { handleLogin, handleSignup } from "./logic.js";

export function initAuthUI() {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = document.getElementById("message");
      const formData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value,
      };
      handleSignup(formData, message);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = document.getElementById("message");
      const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      handleLogin(formData, message);
    });
  }
}
