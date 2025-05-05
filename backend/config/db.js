import pkg from "pg";
const { Pool } = pkg;
import { config } from "./config.js";

/*
## listFiles is a function that I used to read the dir before adding

async function listFiles () {
    try {
        const files = await fs.readdir('.../');
        console.log('Files in directory: ', files);
    } catch (err) {
        console.error('Error reading directory: ', err);
    }
}

listFiles();  */

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("➡ Connected to PostgreSQL");
  } catch (error) {
    console.error("Database Connection Failed: ", error.message);
  }
};

export default pool;
