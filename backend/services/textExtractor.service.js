const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");


const extractText = async (file) => {
  if (!file || !file.path) {
    throw new Error("Invalid file object");
  }

  // PDF
  if (file.mimetype === "application/pdf") {
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);
    return data.text;
  }

  // DOCX
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      path: file.path
    });
    return result.value;
  }

  throw new Error("Unsupported file type");
};

module.exports = { extractText };
