
const Tesseract = require('tesseract.js');

// Function to extract text from an image or scanned PDF
const extractTextFromImage = async (filePath) => {
    try {
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
        return text;
    } catch (error) {
        console.error('OCR error:', error);
        return '';
    }
};

module.exports = { extractTextFromImage };
