const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

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

/* ================= DASHBOARD ================= */
app.get("/dashboard/:username", (req, res) => {
  res.json({
    success: true,
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

/* ================= FEES ================= */
let installments = [
  { no: 1, amount: 5833, status: "Paid" },
  { no: 2, amount: 5833, status: "Paid" },
  { no: 3, amount: 5833, status: "Paid" },
  { no: 4, amount: 5833, status: "Paid" },
  { no: 5, amount: 5833, status: "Paid" },
  { no: 6, amount: 5833, status: "Paid" },
  { no: 7, amount: 7500, status: "Paid" },
  { no: 8, amount: 7600, status: "Unpaid" }
];

app.get("/fees/:username", (req, res) => {

  let paid_amount = 0;

  installments.forEach(i => {
    if (i.status === "Paid") paid_amount += i.amount;
  });

  let total_fees = installments.reduce((sum, i) => sum + i.amount, 0);

  res.json({
    success: true,
    total_fees,
    paid_amount,
    installments
  });
});

/* ================= PAYMENT ================= */
app.post("/pay", (req, res) => {
  const { installment_no } = req.body;

  if (!installment_no) {
    return res.json({ success: false });
  }

  installments = installments.map(i => {
    if (i.no === installment_no) {
      i.status = "Paid";
    }
    return i;
  });

  res.json({
    success: true,
    message: Installment ${installment_no} paid successfully
  });
});

/* ================= HOME ================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

/* ================= START ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});