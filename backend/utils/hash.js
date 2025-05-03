import bcryptjs from "bcryptjs";

export async function hashPassword(password) {
  return await bcryptjs.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
  return await bcryptjs.compare(password, hashedPassword);
}
