document.addEventListener("DOMContentLoaded", () => {
  const landingContainer = document.querySelector(".landing-container");
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
});
