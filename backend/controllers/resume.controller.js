const path = require("path");
const fs = require("fs");

const {extractText} = require("../services/textExtractor.service");
const {calculateATSScore} = require("../services/atsScorer.service");

exports.analyzeResume = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    const filePath = req.file.path;

    //Extract resume text
    const resumeText = await extractText(req.file);

    //Calculate ATS score
    const result = calculateATSScore(resumeText);

    // clear uploaded file
    fs.unlinkSync(filePath);

    return res.json({
      score: result.atsScore,
      matchedKeywords: result.matchedSkills,
      missingKeywords: result.missingSkills
    });

  } catch (error) {
    console.error("ATS ERROR:", error);
    return res.status(500).json(
        { message: "ATS processing failed" }
    );
  }
};
