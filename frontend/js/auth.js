document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");

      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          window.location.href = "../views/verify.html";
        } else {
          message.textContent = data.message || "Something went wrong.";
        }
      } catch (error) {
        message.textContent = "Network error.";
      }
    });
  }
});
