// Creates Generating Code For Email
export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}
