const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// DB (works locally only)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "83A4537",
  database: "college_db"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("DB Connected ✅");
  }
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM students WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {

    // ✅ DB success (local)
    if (!err && result.length > 0) {
      return res.json({
        success: true,
        user: result[0]
      });
    }

    // ✅ FALLBACK (for Render)
    if (username === "10027071344" && password === "18/01/2004") {
      return res.json({
        success: true,
        user: {
          username: "10027071344",
          name: "Ansik Rana"
        }
      });
    }

    res.json({ success: false });
  });
});

// ================= DASHBOARD =================
app.get("/dashboard/:username", (req, res) => {

  // ✅ fallback data (important for Render)
  res.json({
    success: true,
    name: "Ansik Rana",
    subjects: [
      { name: "Financial Management", progress: 8 },
      { name: "Marketing Management", progress: 6 },
      { name: "HR Management", progress: 7 },
      { name: "Operations", progress: 5 },
      { name: "Research Methods", progress: 4 },
      { name: "Banking", progress: 9 }
    ]
  });

});

// ================= FEES =================
app.get("/fees/:username", (req, res) => {

  // ✅ fallback fees data
  res.json({
    success: true,
    data: {
      total_fees: 42498,
      paid_amount: 42498
    }
  });

});

// ================= HOME =================
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// ================= START =================
app.listen(3000, () => {
  console.log("Server running 🚀");
})