import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB,
});

export const closePool = async () => {
  await pool.end();
};

export default pool;
