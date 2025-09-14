import bcryptjs from "bcryptjs";

export async function hashPassword(password) {
  /* Here, password is the normal password but 10
  is the salt round. round means lock, so 1 is 1 lock
  and 10 is 10 lock, means more protecttion */
  return await bcryptjs.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
  /* Here, bcryptjs compare two password, plan password with
  hashed password and it returns true or false. */
  return await bcryptjs.compare(password, hashedPassword);
}
