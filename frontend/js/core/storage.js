export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const saveVerifyEmail = (email) => {
  localStorage.setItem("verifyEmail", email);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearSession = () => {
  return localStorage.clear();
};
