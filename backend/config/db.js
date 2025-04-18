import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// listFiles is a function that I used to read the dir before adding
// async function listFiles () {
//     try {
//         const files = await fs.readdir('.../');
//         console.log('Files in directory: ', files);
//     } catch (err) {
//         console.error('Error reading directory: ', err);
//     }
// }

// listFiles();

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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
