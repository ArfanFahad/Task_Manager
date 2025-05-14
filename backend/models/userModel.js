//id, name, email, password (hashed)
// verificationCode, isVerified

import pool from "../config/db.js";

// 1. Get User by email
export const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};

// 2. Create new user
export const createUser = async (
  username,
  email,
  hashedPassword,
  verificationCode,
  verificationExpires
) => {
  const result = await pool.query(
    `INSERT INTO users (username, email, password, verification_code, verification_expires)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
    [username, email, hashedPassword, verificationCode, verificationExpires]
  );
  return result.rows[0];
};

// 3. Mark user as verified
export const markUserAsVerified = async (email) => {
  await pool.query(`UPDATE users SET is_verified = true WHERE email = $1`, [
    email,
  ]);
};

/* 

# A test function to check whether every function work

async function test() {
  try {
    await markUserAsVerified("nur@example.com");
    console.log("Marked successful");
  } catch (error) {
    console.error(error.message);
  }
}

test();

*/
