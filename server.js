const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "83A4537",
  database: "college_db"
});

// Connect DB
db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Error:", err);
  } else {
    console.log("DB Connected ✅");
  }
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM students WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        user: result[0]
      });
    } else {
      res.json({ success: false });
    }
  });
});

// ================= DASHBOARD =================
app.get("/dashboard/:username", (req, res) => {
  const username = req.params.username;

  const sql = "SELECT name, subjects FROM students WHERE username=?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    if (result.length > 0) {
      let subjects = [];

      try {
        // 🔥 FIX HERE
        subjects = JSON.parse(result[0].subjects);
      } catch (e) {
        console.log("JSON Parse Error:", e);
      }

      res.json({
        success: true,
        name: result[0].name,
        subjects: subjects
      });

    } else {
      res.json({ success: false });
    }
  });
});
// ================= FEES =================
app.get("/fees/:username", (req, res) => {
  const username = req.params.username;

  const sql = "SELECT total_fees, paid_amount FROM students WHERE username=?";

  db.query(sql, [username], (err, result) => {
    if (err) return res.json({ success: false });

    if (result.length > 0) {
      res.json({
        success: true,
        data: result[0]
      });
    } else {
      res.json({ success: false });
    }
function downloadReceipt() {
  // fake error like real portal
  alert("❌ Error: Unable to download receipt. Please try again later.");
}
  });
});

// ================= TEST =================
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
// ================= START =================
app.listen(3000, () => {
  console.log("Server running → https://cu-portal.onrender.com 🚀");
});