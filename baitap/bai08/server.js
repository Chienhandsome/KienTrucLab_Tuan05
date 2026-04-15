const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "mydb",
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ message: "Connected to MySQL", rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "MySQL connection failed" });
  }
});

app.listen(port, () => {
  console.log(`Node app listening on port ${port}`);
});
