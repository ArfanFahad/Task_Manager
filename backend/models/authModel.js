import pool from "../config/db.js";

export const replaceVerificationCode = async (
  email,
  newCode,
  expiresInSeconds = 60
) => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

  // updating the user's verification_code and verification_expires fields
  const result = await pool.query(
    `UPDATE users 
        SET
            verification_code = $1,
            verification_expires = $2
        WHERE email = $3
        RETURNING id, email;`,
    [newCode, expiresAt, email]
  );

  return result.rows[0];
};
