import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loanRoutes from "./routes/loanRoutes.js";
import pool from "./config/db.js"; // ✅ MySQL connection

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/loans", loanRoutes);

// Test MySQL Connection
(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ MySQL Connected, Test Result:", rows[0].result);
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    process.exit(1); // Stop server if DB connection fails
  }
})();

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
