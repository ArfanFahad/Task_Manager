document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginFrom = document.getElementById("login-form");
  const logoutButton = document.getElementById("logoutBtn");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const message = document.getElementById("message");

      if (password !== confirmPassword) {
        return (message.textContent = "Password is not matching");
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("verifyEmail", email);
          window.location.href = "../views/verify.html";
        } else {
          message.textContent = data.message || "Something went wrong.";
        }
      } catch (error) {
        message.textContent = "Network error.";
      }
    });
  }

  if (loginFrom) {
    loginFrom.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // localStorage.setItem("Bearer", )
          window.location.href = "/frontend/views/dashboard.html";
        } else {
          message.textContent = data.message || "Something went wrong.";
        }
      } catch (error) {
        message.textContent = "Network error.";
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("token");
      window.location.href = "/frontend/views/login.html";
    });
  }
});
