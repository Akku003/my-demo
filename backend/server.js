const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//create upload dir if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

//candidate routes
const candidateRoutes = require("./routes/candidate.routes");
app.use("/api/candidate", candidateRoutes);

//resume
const resumeRoutes = require("./routes/resume.routes");
app.use("/api/resume", resumeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

