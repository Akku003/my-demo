// // routes/resume.routes.js

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();
// const {
//   analyzeResume
// } = require("../controllers/resume.controller");
// // Services
// const { extractText } = require("../services/textExtractor.service");
// const { extractTextFromImage } = require("../services/ocr.service");
// const { calculateATSScore } = require("../services/atsScorer.service");

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // make sure 'uploads' folder exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // POST /upload route to handle resume uploads
// router.post("/upload", upload.single("resume"), async (req, res) => {
//   try {
//     // Step 1: Extract text normally
//     let resumeText = await extractText(req.file);

//     // Step 2: If text is empty or very short, run OCR
//     if (!resumeText || resumeText.trim().length < 50) {
//       resumeText = await extractTextFromImage(req.file.path);
//     }

//     // Step 3: Get Job Description from request
//     const jobDescription = req.body.jobDescription || "";

//     // Step 4: Calculate ATS score
//     const atsResult = calculateATSScore(resumeText, jobDescription);

//     // Step 5: Send response
//     res.json({
//       message: "ATS evaluation completed",
//       atsResult
//     });
//   } catch (error) {
//     console.error("Error in /upload route:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { requireAuth, requireCandidate } =
  require("../middleware/auth.middleware");

const resumeController =
  require("../controllers/resume.controller");

const upload = multer({
  dest: path.join(__dirname, "../uploads")
});

router.post(
  "/analyze",
  requireAuth,
  requireCandidate,
  upload.single("resume"),
  resumeController.analyzeResume
);

module.exports = router;
