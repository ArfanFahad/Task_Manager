let timeLeft; // primary timer
let countdown; // storing state of timer
const form = document.getElementById("verifyForm");
const timerDisplay = document.getElementById("timer");
const statusMessage = document.getElementById("status");
const resendBtn = document.getElementById("resendBtn");
import { showModal } from "./ui/modal.js";

function startTimer() {
  timeLeft = 60;
  clearInterval(countdown);
  timerDisplay.textContent = timeLeft;
  statusMessage.textContent = "Waiting for Code ...";
  statusMessage.style.color = "black";
  resendBtn.style.backgroundColor = "grey";
  resendBtn.disabled = true;

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      statusMessage.textContent = "Code expired. Please request a new one.";
      statusMessage.style.color = "red";
      resendBtn.style.backgroundColor = "blue";
      resendBtn.disabled = false;
    }
  }, 1000);
}

resendBtn.addEventListener("click", async function () {
  startTimer();
  const email = localStorage.getItem("pendingVerificationEmail");
  if (!email) {
    alert("No email found to resend code.");
    return;
  }
  const res = await fetch("http://localhost:5000/api/auth/resend-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (res.ok) {
    alert("New verification code sent.");
  } else {
    alert("Failed to resend");
  }
});

startTimer();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = document.getElementById("vCode").value;
  const email = localStorage.getItem("pendingVerificationEmail");

  // Sending the code to server for matching with db code
  const response = await fetch("http://localhost:5000/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Verification Successful, redirecting...");
    localStorage.removeItem("pendingVerificationEmail");
    window.location.href = "../views/login.html";
  } else {
    alert("Verification Failed: ", +result.message);
  }
});
