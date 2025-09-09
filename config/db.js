import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 30000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("✅ MySQL Connection Pool Created Successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Failed to Create MySQL Connection Pool:", err.message);
  });

export default pool;
