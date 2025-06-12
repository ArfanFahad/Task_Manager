export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function saveVerifyEmail(email) {
  localStorage.setItem("verifyEmail", email);
}

export function getToken() {
  return localStorage.getItem("token");
}
