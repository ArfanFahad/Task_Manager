async function landingPageLoader() {
  const landingContainer = document.querySelector(".landing-container");

  // Landing Container
  if (landingContainer) {
    const signBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    if (signBtn) {
      signBtn.addEventListener("click", function () {
        window.location.href = "/frontend/views/signup.html";
      });
    }
    if (loginBtn) {
      loginBtn.addEventListener("click", function () {
        window.location.href = "/frontend/views/login.html";
      });
    }
  }

  async function loadTaskSummary() {
    try {
      const response = await fetch(`http://localhost:5000/tasks/getSummary`);
      const data = await response.json();

      document.getElementById("totalTasks").textContent = data.total;
      document.getElementById("completedTasks").textContent = data.completed;
      document.getElementById("incompleteTasks").textContent = data.incomplete;
    } catch (error) {
      console.error("Error Fetching Data: ", error.message);
    }
  }

  loadTaskSummary();
}

landingPageLoader();
